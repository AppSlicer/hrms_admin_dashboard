import { useState } from 'react';

function EmailMarketing() {
    const [campaigns, setCampaigns] = useState([
        {
            id: 1,
            name: 'Welcome Series',
            status: 'active',
            recipients: 1250,
            openRate: 42,
            clickRate: 18,
            scheduledDate: '2024-01-15'
        },
        {
            id: 2,
            name: 'Product Launch',
            status: 'draft',
            recipients: 0,
            openRate: 0,
            clickRate: 0,
            scheduledDate: '2024-01-20'
        },
        {
            id: 3,
            name: 'Weekly Newsletter',
            status: 'completed',
            recipients: 3200,
            openRate: 38,
            clickRate: 12,
            scheduledDate: '2024-01-08'
        }
    ]);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newCampaign, setNewCampaign] = useState({
        name: '',
        subject: '',
        recipients: '',
        template: 'basic',
        scheduledDate: ''
    });

    const handleCreateCampaign = () => {
        const campaign = {
            id: campaigns.length + 1,
            ...newCampaign,
            status: 'draft',
            openRate: 0,
            clickRate: 0,
            recipients: parseInt(newCampaign.recipients) || 0
        };
        setCampaigns([...campaigns, campaign]);
        setShowCreateModal(false);
        setNewCampaign({ name: '', subject: '', recipients: '', template: 'basic', scheduledDate: '' });
    };

    const getStatusBadge = (status: string) => {
        const statusStyles = {
            active: 'bg-green-100 text-green-800',
            draft: 'bg-gray-100 text-gray-800',
            completed: 'bg-blue-100 text-blue-800',
            paused: 'bg-yellow-100 text-yellow-800'
        };
        return (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
        {status}
      </span>
        );
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Email Marketing</h1>
                    <p className="text-gray-600 mt-2">Manage and track your email campaigns</p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                    Create Campaign
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-gray-500 text-sm font-medium">Total Campaigns</h3>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{campaigns.length}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-gray-500 text-sm font-medium">Active Campaigns</h3>
                    <p className="text-2xl font-bold text-green-600 mt-2">
                        {campaigns.filter(c => c.status === 'active').length}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-gray-500 text-sm font-medium">Avg. Open Rate</h3>
                    <p className="text-2xl font-bold text-blue-600 mt-2">
                        {Math.round(campaigns.reduce((acc, c) => acc + c.openRate, 0) / campaigns.length)}%
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-gray-500 text-sm font-medium">Avg. Click Rate</h3>
                    <p className="text-2xl font-bold text-purple-600 mt-2">
                        {Math.round(campaigns.reduce((acc, c) => acc + c.clickRate, 0) / campaigns.length)}%
                    </p>
                </div>
            </div>

            {/* Campaigns Table */}
            <div className="bg-white rounded-lg shadow-sm border">
                <div className="px-6 py-4 border-b">
                    <h2 className="text-lg font-semibold text-gray-900">Email Campaigns</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Campaign Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Recipients
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Open Rate
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Click Rate
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Scheduled Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {campaigns.map((campaign) => (
                            <tr key={campaign.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {getStatusBadge(campaign.status)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {campaign.recipients.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{campaign.openRate}%</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{campaign.clickRate}%</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {campaign.scheduledDate}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                                    <button className="text-red-600 hover:text-red-900">Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Campaign Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <h3 className="text-lg font-semibold mb-4">Create New Campaign</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Campaign Name
                                </label>
                                <input
                                    type="text"
                                    value={newCampaign.name}
                                    onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter campaign name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Subject
                                </label>
                                <input
                                    type="text"
                                    value={newCampaign.subject}
                                    onChange={(e) => setNewCampaign({...newCampaign, subject: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter email subject"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Recipients
                                </label>
                                <input
                                    type="number"
                                    value={newCampaign.recipients}
                                    onChange={(e) => setNewCampaign({...newCampaign, recipients: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Number of recipients"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Template
                                </label>
                                <select
                                    value={newCampaign.template}
                                    onChange={(e) => setNewCampaign({...newCampaign, template: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="basic">Basic Template</option>
                                    <option value="newsletter">Newsletter</option>
                                    <option value="promotional">Promotional</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Schedule Date
                                </label>
                                <input
                                    type="date"
                                    value={newCampaign.scheduledDate}
                                    onChange={(e) => setNewCampaign({...newCampaign, scheduledDate: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end space-x-3 mt-6">
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateCampaign}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Create Campaign
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EmailMarketing;