import React, { useState } from "react";
import { events } from "../data/events";
import EventCard from "./EventCard";

interface EventsSectionProps {
  onBGMIMoreDetails: () => void;
  onLinuxMoreDetails: () => void;
  onCodeMarathonMoreDetails: () => void;
  onPromptWarMoreDetails: () => void;
  onBoxCricketMoreDetails: () => void;
}

const EventsSection: React.FC<EventsSectionProps> = ({
  onBGMIMoreDetails,
  onLinuxMoreDetails,
  onCodeMarathonMoreDetails,
  onPromptWarMoreDetails,
  onBoxCricketMoreDetails,
}) => {
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalEvent, setModalEvent] = useState("");
  const [formFields, setFormFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [boxPlayers, setBoxPlayers] = useState<string[]>(Array(7).fill(""));

  const rawCertFlag = import.meta.env.VITE_CERTIFICATE_DOWNLOAD_ENABLED;

  const certEnabled =
    rawCertFlag === undefined ? true : rawCertFlag.toUpperCase() === "ON";

  const handleCertificateDownload = async (
    eventTitle: string,
    details: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    }
  ) => {
    setDownloadStatus("Downloading certificate...");

    setDownloadError(null);
    const { firstName, lastName, email, phone } = details;
    try {
      const res = await fetch("/api/download-certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          event: eventTitle,
        }),
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${eventTitle.replace(
          /\s+/g,
          "_"
        )}_${firstName}_${lastName}_certificate.png`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        setDownloadError(null);
        setDownloadStatus(null);
        setIsModalOpen(false);
      } else {
        const errData = await res.json().catch(() => null);
        const msg = errData?.error || "Certificate download failed";
        setDownloadError(msg);
        setDownloadStatus(null);
      }
    } catch (err) {
      console.error(err);
      setDownloadError("Certificate download failed.");
      setDownloadStatus(null);
    }
  };

  const openModal = (eventTitle: string) => {
    setModalEvent(eventTitle);
    setFormFields({ firstName: "", lastName: "", email: "", phone: "" });
    setFormErrors({ firstName: "", lastName: "", email: "", phone: "" });
    setBoxPlayers(Array(7).fill(""));
    setDownloadError(null);
    setDownloadStatus(null);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: typeof formErrors = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    };
    if (modalEvent === "Box Cricket") {
      const playerErrors = boxPlayers.map((name) => !name.trim());
      if (playerErrors.some((err) => err)) {
        setDownloadError("All player names are required");
        return;
      }
    } else {
      if (!formFields.firstName.trim())
        errors.firstName = "First name is required";
      if (!formFields.lastName.trim())
        errors.lastName = "Last name is required";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formFields.email))
      errors.email = "Valid email is required";
    if (!/^\d{10}$/.test(formFields.phone))
      errors.phone = "Valid 10-digit phone is required";
    setFormErrors(errors);
    if (errors.firstName || errors.lastName || errors.email || errors.phone)
      return;
    setDownloadError(null);
    setDownloadStatus("Downloading certificate...");
    if (modalEvent === "Box Cricket") {
      for (const playerName of boxPlayers) {
        const parts = playerName.trim().split(" ");
        const firstName = parts.shift() || "";
        const lastName = parts.join(" ") || "";
        await handleCertificateDownload(modalEvent, {
          firstName,
          lastName,
          email: formFields.email,
          phone: formFields.phone,
        });
      }
      setDownloadStatus(null);
      setIsModalOpen(false);
    } else {
      handleCertificateDownload(modalEvent, {
        firstName: formFields.firstName,
        lastName: formFields.lastName,
        email: formFields.email,
        phone: formFields.phone,
      });
    }
  };

  return (
    <section
      id="events"
      className="relative min-h-screen w-full py-20 px-4 flex items-center justify-center overflow-hidden"
    >
      {/* Decorative blurred background accents */}
      <div className="absolute left-0 top-0 w-80 h-80 bg-gradient-to-br from-blue-600/30 via-fuchsia-500/20 to-indigo-700/20 rounded-full blur-3xl opacity-50 -z-10"></div>
      <div className="absolute right-0 bottom-0 w-72 h-72 bg-gradient-to-tr from-yellow-400/20 via-pink-500/20 to-blue-400/20 rounded-full blur-3xl opacity-40 -z-10"></div>
      <div className="max-w-390">
        <h2 className="font-mokoto text-4xl font-bold text-center mb-16 gradient-text drop-shadow-lg gradient-title-neuroverse tracking-tight">
          Our Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {events.map((event) => {
            const handleDetailsClick = () => {
              window.scrollTo({ top: 0, behavior: "instant" });
              if (event.title === "Prompt War") onPromptWarMoreDetails();
              else if (event.title === "Box Cricket") onBoxCricketMoreDetails();
              else if (event.title === "BGMI Dominator") onBGMIMoreDetails();
              else if (event.title === "Dock The Flag") onLinuxMoreDetails();
              else if (event.title === "Code Marathon")
                onCodeMarathonMoreDetails();
            };
            const handleDownloadClick = () => {
              fetch("/api/download-certificate", { method: "PUT" })
                .then((res) => res.json())
                .then((data) => {
                  if (data.success) openModal(event.title);
                  else
                    alert(
                      "You will be able to download certificates after all the events are completed"
                    );
                })
                .catch(() => alert("Unable to check certificate availability"));
            };
            return (
              <EventCard
                key={event.id}
                event={event}
                certEnabled={certEnabled}
                onMoreDetails={handleDetailsClick}
                onDownloadClick={handleDownloadClick}
              />
            );
          })}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-lg w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4">
                  Download {modalEvent} Certificate
                </h3>
                <form onSubmit={handleModalSubmit} className="space-y-4">
                  {modalEvent === "Box Cricket" ? (
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Player Names (7)<span className="text-red-500">*</span>
                      </label>
                      <div>
                        {boxPlayers.map((player, idx) => (
                          <input
                            key={idx}
                            className="form-input w-full mb-1"
                            placeholder={
                              idx === 0 ? "Leader" : `Player ${idx + 1}`
                            }
                            value={player}
                            onChange={(e) => {
                              const arr = [...boxPlayers];
                              arr[idx] = e.target.value;
                              setBoxPlayers(arr);
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <label className="block text-sm font-medium">
                          First Name<span className="text-red-500">*</span>
                        </label>
                        <input
                          className="form-input w-full"
                          value={formFields.firstName}
                          onChange={(e) =>
                            setFormFields({
                              ...formFields,
                              firstName: e.target.value,
                            })
                          }
                        />
                        {formErrors.firstName && (
                          <p className="text-red-500 text-sm">
                            {formErrors.firstName}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium">
                          Last Name<span className="text-red-500">*</span>
                        </label>
                        <input
                          className="form-input w-full"
                          value={formFields.lastName}
                          onChange={(e) =>
                            setFormFields({
                              ...formFields,
                              lastName: e.target.value,
                            })
                          }
                        />
                        {formErrors.lastName && (
                          <p className="text-red-500 text-sm">
                            {formErrors.lastName}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium">
                      Email<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-input w-full"
                      value={formFields.email}
                      onChange={(e) =>
                        setFormFields({ ...formFields, email: e.target.value })
                      }
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm">{formErrors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Phone<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      className="form-input w-full"
                      value={formFields.phone}
                      onChange={(e) =>
                        setFormFields({ ...formFields, phone: e.target.value })
                      }
                    />
                    {formErrors.phone && (
                      <p className="text-red-500 text-sm">{formErrors.phone}</p>
                    )}
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary">
                      Download
                    </button>
                  </div>
                  {downloadError && (
                    <p className="text-red-500 text-sm mt-2">{downloadError}</p>
                  )}
                  {downloadStatus && (
                    <p className="text-green-500 text-sm mt-2">
                      {downloadStatus}
                    </p>
                  )}
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
