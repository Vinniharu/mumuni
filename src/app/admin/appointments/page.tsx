"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";
import AdminLayout from "@/components/admin/AdminLayout";

interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  appointment_date: string;
  appointment_time: string;
  message?: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  created_at: string;
  updated_at: string;
}

export default function AdminAppointments() {
  const { token } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filter, setFilter] = useState("all");
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAppointments();

    const interval = setInterval(() => {
      fetchAppointments();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/appointments`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }

      const data = await response.json();
      if (data.success) {
        setAppointments(data.appointments || []);
      }
    } catch (error) {
      console.error("Appointments error:", error);
    }
  };

  const updateAppointmentStatus = async (appointmentId: string, newStatus: string) => {
    const loadingToast = toast.loading("Updating status...");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/appointments/${appointmentId}/status`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update appointment status");
      }

      const data = await response.json();
      if (data.success) {
        setAppointments((prev) =>
          prev.map((apt) =>
            apt.id === appointmentId ? { ...apt, status: newStatus as any, updated_at: data.data.updated_at } : apt
          )
        );
        toast.success(`Status updated to ${newStatus}`, { id: loadingToast });
        setIsModalOpen(false);
        setSelectedAppointment(null);
      } else {
        toast.error("Failed to update status", { id: loadingToast });
      }
    } catch (error) {
      console.error("Status update error:", error);
      toast.error("Failed to update status", { id: loadingToast });
    }
  };

  const openStatusModal = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  const filteredAppointments = appointments.filter((apt) => {
    if (filter === "all") return true;
    return apt.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "confirmed":
        return "bg-green-50 text-green-700 border-green-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      case "completed":
        return "bg-gray-50 text-gray-700 border-gray-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const stats = [
    { label: "Total", value: appointments.length, icon: "📅", color: "bg-gradient-to-br from-purple-50 to-pink-50" },
    {
      label: "Pending",
      value: appointments.filter((a) => a.status === "pending").length,
      icon: "⏳",
      color: "bg-gradient-to-br from-amber-50 to-orange-50",
    },
    {
      label: "Confirmed",
      value: appointments.filter((a) => a.status === "confirmed").length,
      icon: "✓",
      color: "bg-gradient-to-br from-green-50 to-emerald-50",
    },
    {
      label: "Completed",
      value: appointments.filter((a) => a.status === "completed").length,
      icon: "✨",
      color: "bg-gradient-to-br from-blue-50 to-indigo-50",
    },
  ];

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Elegant Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-serif text-brand-primary italic">Appointments</h1>
              <div className="h-px flex-1 ml-8 bg-gradient-to-r from-brand-primary/20 to-transparent"></div>
            </div>
            <p className="text-sm text-gray-600">Manage your makeup appointments with elegance</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`${stat.color} rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-white/50`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium uppercase tracking-wider text-gray-600">{stat.label}</span>
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <div className="text-3xl font-light text-gray-900">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Filter Tabs */}
          <div className="mb-6 bg-white rounded-2xl shadow-sm p-2 inline-flex">
            {[
              { key: "all", label: "All" },
              { key: "pending", label: "Pending" },
              { key: "confirmed", label: "Confirmed" },
              { key: "cancelled", label: "Cancelled" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-6 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                  filter === tab.key
                    ? "bg-brand-primary text-white shadow-sm"
                    : "text-gray-600 hover:text-brand-primary hover:bg-gray-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Appointments List */}
          {filteredAppointments.length === 0 ? (
            <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
              <div className="text-6xl mb-4 opacity-20">📅</div>
              <p className="text-sm text-gray-500">No appointments found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-medium text-gray-900">{appointment.name}</h3>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </div>
                      <div className="space-y-1.5 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">📧</span>
                          {appointment.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">📱</span>
                          {appointment.phone}
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <div className="font-medium text-brand-primary">{formatDate(appointment.appointment_date)}</div>
                      <div className="text-gray-600 mt-1">{appointment.appointment_time}</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="mb-3">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Service</span>
                      <p className="text-sm text-gray-900 mt-1">{appointment.service}</p>
                    </div>

                    {appointment.message && (
                      <div className="mb-4">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Message</span>
                        <p className="text-sm text-gray-700 mt-1 leading-relaxed">{appointment.message}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-3">
                      <div className="text-xs text-gray-400">Created {formatDate(appointment.created_at)}</div>
                      <button
                        onClick={() => openStatusModal(appointment)}
                        className="px-4 py-2 text-sm font-medium text-brand-primary hover:bg-brand-primary hover:text-white border border-brand-primary rounded-lg transition-all duration-200"
                      >
                        Change Status
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Status Change Modal */}
        {isModalOpen && selectedAppointment && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
              <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={closeModal}></div>

              <div className="relative bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl">
                <button
                  onClick={closeModal}
                  className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors"
                >
                  <span className="text-2xl">×</span>
                </button>

                <h2 className="text-2xl font-serif text-brand-primary italic mb-6">Update Status</h2>

                <div className="mb-6 pb-6 border-b border-gray-100">
                  <div className="text-base text-gray-900 mb-1 font-medium">{selectedAppointment.name}</div>
                  <div className="text-sm text-gray-500">{selectedAppointment.email}</div>
                  <div className="text-sm text-gray-500 mt-2">
                    {formatDate(selectedAppointment.appointment_date)} at {selectedAppointment.appointment_time}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {["pending", "confirmed", "cancelled", "completed"].map((status) => (
                    <button
                      key={status}
                      onClick={() => updateAppointmentStatus(selectedAppointment.id, status)}
                      disabled={selectedAppointment.status === status}
                      className={`w-full px-4 py-3 text-sm font-medium rounded-xl text-left transition-all ${
                        selectedAppointment.status === status
                          ? "bg-gray-50 text-gray-400 cursor-not-allowed border border-gray-200"
                          : "bg-white text-gray-900 hover:bg-brand-primary hover:text-white border border-gray-200 hover:border-brand-primary"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="capitalize">{status}</span>
                        {selectedAppointment.status === status && <span className="text-xs">(Current)</span>}
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={closeModal}
                  className="w-full px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
