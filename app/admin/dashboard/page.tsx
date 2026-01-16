'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';
import * as XLSX from 'xlsx';

interface Enquiry {
    id: string;
    created_at: string;
    name: string;
    phone: string;
    email: string;
    budget: string;
    property_type: string;
    message: string;
}

export default function Dashboard() {
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push('/admin');
            } else {
                fetchEnquiries();
            }
        };
        checkUser();
    }, [router]);

    const fetchEnquiries = async () => {
        setLoading(true);
        let query = supabase
            .from('enquiries')
            .select('*')
            .order('created_at', { ascending: false });

        if (startDate) {
            // Add time to start date to compare correctly
            query = query.gte('created_at', `${startDate}T00:00:00`);
        }
        if (endDate) {
            // Add time to end date to ensure the whole day is included
            query = query.lte('created_at', `${endDate}T23:59:59`);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching enquiries:', error);
        } else {
            setEnquiries(data || []);
            // Clear selection when filters change
            setSelectedIds(new Set());
        }
        setLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/admin');
    };

    const toggleSelection = (id: string) => {
        const newSelected = new Set(selectedIds);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedIds(newSelected);
    };

    const toggleAll = () => {
        if (selectedIds.size === enquiries.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(enquiries.map((e) => e.id)));
        }
    };

    const exportToExcel = () => {
        const dataToExport = enquiries.length > 0 && selectedIds.size > 0
            ? enquiries.filter((e) => selectedIds.has(e.id))
            : enquiries;

        if (dataToExport.length === 0) {
            alert('No data to export');
            return;
        }

        // Format data for Excel
        const formattedData = dataToExport.map(row => ({
            Date: new Date(row.created_at).toLocaleString(),
            Name: row.name,
            Phone: row.phone,
            Email: row.email,
            Budget: row.budget,
            'Property Type': row.property_type,
            Message: row.message
        }));

        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Enquiries');

        // Generate Excel file
        XLSX.writeFile(workbook, 'K10_Enquiries.xlsx');
    };

    if (loading && !startDate && !endDate) return <div className="p-8">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold text-gray-900">Enquiries Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                    >
                        Logout
                    </button>
                </div>

                {/* Filters and Actions */}
                <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col md:flex-row gap-4 items-end md:items-center justify-between">
                    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-primary-rust focus:border-primary-rust"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-primary-rust focus:border-primary-rust"
                            />
                        </div>
                        <div className="flex items-end">
                            <button
                                onClick={fetchEnquiries}
                                className="px-4 py-2 bg-primary-rust text-white rounded-md hover:bg-primary-rust/90 transition-colors text-sm font-medium"
                            >
                                Filter
                            </button>
                            {(startDate || endDate) && (
                                <button
                                    onClick={() => {
                                        setStartDate('');
                                        setEndDate('');
                                        // setTimeout to allow state update before fetch (simple fix for now)
                                        // In a perfect world we'd use useEffect for this reset logic or pass params directly
                                        window.location.reload();
                                    }}
                                    className="ml-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">
                            {selectedIds.size > 0 ? `${selectedIds.size} selected` : 'Export all if none selected'}
                        </span>
                        <button
                            onClick={exportToExcel}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Export Excel
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white shadow overflow-hidden rounded-lg">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left">
                                        <input
                                            type="checkbox"
                                            checked={enquiries.length > 0 && selectedIds.size === enquiries.length}
                                            onChange={toggleAll}
                                            className="h-4 w-4 text-primary-rust border-gray-300 rounded focus:ring-primary-rust"
                                        />
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {enquiries.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">
                                            No enquiries found.
                                        </td>
                                    </tr>
                                ) : (
                                    enquiries.map((enquiry) => (
                                        <tr key={enquiry.id} className={selectedIds.has(enquiry.id) ? 'bg-orange-50' : ''}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIds.has(enquiry.id)}
                                                    onChange={() => toggleSelection(enquiry.id)}
                                                    className="h-4 w-4 text-primary-rust border-gray-300 rounded focus:ring-primary-rust"
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(enquiry.created_at).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{enquiry.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{enquiry.phone}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{enquiry.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{enquiry.budget}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{enquiry.property_type}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{enquiry.message}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
