export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold">MondayTrip</h1>
      <p className="text-xl font-medium text-gray-600">Find your next trip</p>
      <div className="flex flex-col justify-center items-center w-1/2">
        <input className="w-full px-4 py-2 mt-4 text-xl font-medium text-gray-600 bg-gray-100 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent" placeholder="Search for a trip" />
        <button className="w-full px-4 py-2 mt-4 text-xl font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent">Search</button>
      </div>
    </div>
  )
}
