import { getCountTenantRequest } from "@/services/Tenant";

const page = async() => {
    const {data } = await getCountTenantRequest()

    return (
        <div className="p-6 bg-gray-50 min-h-screen rounded-3xl">
            <div className="max-w-9xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">My Rentals</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                     
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold mb-2">Approved Applications</h2>
                                    <p className="text-4xl font-bold text-black">{data[0]?.count || 0}</p>
                                    <p className="text-gray-500 mt-2">Active rentals</p>
                                </div>
                                <div className="bg-blue-100 p-4 rounded-lg">
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold mb-2">Pending Applications</h2>
                                    <p className="text-4xl font-bold text-black">{data[1]?.count || 0}</p>
                                    <p className="text-gray-500 mt-2">Under review</p>
                                </div>
                                <div className="bg-orange-100 p-4 rounded-lg">
                                    <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

            </div>
        </div>
    );
};

export default page;