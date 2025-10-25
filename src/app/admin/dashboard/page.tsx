"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import AdminLayout from "@/components/admin/AdminLayout";
import Link from "next/link";

interface DashboardStats {
  appointments: {
    total: number;
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
  };
  classes: {
    total: number;
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
  };
}

export default function AdminDashboard() {
  const { token } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    appointments: { total: 0, pending: 0, confirmed: 0, completed: 0, cancelled: 0 },
    classes: { total: 0, pending: 0, confirmed: 0, completed: 0, cancelled: 0 },
  });

  useEffect(() => {
    fetchStats();

    const interval = setInterval(() => {
      fetchStats();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const [appointmentsRes, classesRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/appointments`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/classes`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }),
      ]);

      if (appointmentsRes.ok && classesRes.ok) {
        const appointmentsData = await appointmentsRes.json();
        const classesData = await classesRes.json();

        const appointments = appointmentsData.appointments || [];
        const classes = classesData.classes || [];

        setStats({
          appointments: {
            total: appointments.length,
            pending: appointments.filter((a: any) => a.status === "pending").length,
            confirmed: appointments.filter((a: any) => a.status === "confirmed").length,
            completed: appointments.filter((a: any) => a.status === "completed").length,
            cancelled: appointments.filter((a: any) => a.status === "cancelled").length,
          },
          classes: {
            total: classes.length,
            pending: classes.filter((c: any) => c.status === "pending").length,
            confirmed: classes.filter((c: any) => c.status === "confirmed").length,
            completed: classes.filter((c: any) => c.status === "completed").length,
            cancelled: classes.filter((c: any) => c.status === "cancelled").length,
          },
        });
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Elegant Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-serif text-brand-primary italic">Dashboard</h1>
              <div className="h-px flex-1 ml-8 bg-gradient-to-r from-brand-primary/20 to-transparent"></div>
            </div>
            <p className="text-sm text-gray-600">Your beauty business at a glance</p>
          </div>

          {/* Stats */}
          {/* Appointments Stats */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Appointments</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                {
                  label: "Total",
                  value: stats.appointments.total,
                  icon: "📅",
                  color: "bg-gradient-to-br from-purple-50 to-pink-50",
                },
                {
                  label: "Pending",
                  value: stats.appointments.pending,
                  icon: "⏳",
                  color: "bg-gradient-to-br from-amber-50 to-orange-50",
                },
                {
                  label: "Confirmed",
                  value: stats.appointments.confirmed,
                  icon: "✓",
                  color: "bg-gradient-to-br from-green-50 to-emerald-50",
                },
                {
                  label: "Completed",
                  value: stats.appointments.completed,
                  icon: "✨",
                  color: "bg-gradient-to-br from-blue-50 to-indigo-50",
                },
                {
                  label: "Cancelled",
                  value: stats.appointments.cancelled,
                  icon: "✕",
                  color: "bg-gradient-to-br from-red-50 to-rose-50",
                },
              ].map((stat, idx) => (
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
          </div>

          {/* Classes Stats */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Class Enrollments</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                {
                  label: "Total",
                  value: stats.classes.total,
                  icon: "🎓",
                  color: "bg-gradient-to-br from-purple-50 to-pink-50",
                },
                {
                  label: "Pending",
                  value: stats.classes.pending,
                  icon: "⏳",
                  color: "bg-gradient-to-br from-amber-50 to-orange-50",
                },
                {
                  label: "Confirmed",
                  value: stats.classes.confirmed,
                  icon: "✓",
                  color: "bg-gradient-to-br from-green-50 to-emerald-50",
                },
                {
                  label: "Completed",
                  value: stats.classes.completed,
                  icon: "✨",
                  color: "bg-gradient-to-br from-blue-50 to-indigo-50",
                },
                {
                  label: "Cancelled",
                  value: stats.classes.cancelled,
                  icon: "✕",
                  color: "bg-gradient-to-br from-red-50 to-rose-50",
                },
              ].map((stat, idx) => (
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
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/admin/appointments"
              className="bg-white rounded-2xl p-8 text-left group hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-brand-primary"
            >
              <div className="text-4xl mb-4 opacity-60 group-hover:opacity-100 transition-opacity">📅</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Appointments</h3>
              <p className="text-sm text-gray-500">Manage all bookings and schedules</p>
              <div className="mt-4 text-brand-primary text-sm font-medium group-hover:underline">View all →</div>
            </Link>

            <Link
              href="/admin/classes"
              className="bg-white rounded-2xl p-8 text-left group hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-brand-primary"
            >
              <div className="text-4xl mb-4 opacity-60 group-hover:opacity-100 transition-opacity">🎓</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Classes</h3>
              <p className="text-sm text-gray-500">Manage student enrollments</p>
              <div className="mt-4 text-brand-primary text-sm font-medium group-hover:underline">View all →</div>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
