import PaperList from "../components/PaperList"; // Make sure the path is correct

const PapersPage = () => {
  return (
    <div className="w-full min-h-screen bg-[#1a202c] text-white pt-20">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Previous Year Papers</h1>
        <p className="text-gray-400 mt-2">
          Select a subject to view available question papers.
        </p>
      </div>
      <PaperList />
    </div>
  );
};

export default PapersPage;
