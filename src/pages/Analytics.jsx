import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  RadialLinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { BarChart3, Home } from "lucide-react";
import { useEffect, useState } from "react";
import { Bar, PolarArea } from "react-chartjs-2";
import { Link } from "react-router-dom";
import syllabus from "../data/syllabus.json";
import useWindowSize from "../hooks/useWindowSize"; // <-- Import our new hook

// Register the components you're using from Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);

const Analytics = () => {
  const [progressData, setProgressData] = useState(null);
  const [checked, setChecked] = useState({});
  const { width } = useWindowSize(); // <-- Use the hook
  const isMobile = width < 768; // <-- Define our breakpoint for mobile

  useEffect(() => {
    const saved = localStorage.getItem("studyProgress");
    if (saved) {
      setChecked(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(checked).length > 0) {
      const theorySubjects = syllabus.subjects.filter(
        (s) => s.type === "Theory"
      );

      const labels = theorySubjects.map((s) => s.name);
      const dataPoints = theorySubjects.map((subject) => {
        const total = subject.modules.reduce(
          (acc, m) => acc + m.topics.length,
          0
        );
        if (total === 0) return 0;
        const completed = subject.modules.reduce(
          (acc, m) =>
            acc +
            m.topics.filter((t) => checked[`${subject.name}-${t}`]).length,
          0
        );
        return Math.round((completed / total) * 100);
      });

      const totalTopics = theorySubjects.reduce(
        (sum, s) =>
          sum + s.modules.reduce((acc, m) => acc + m.topics.length, 0),
        0
      );
      const totalCompleted = theorySubjects.reduce(
        (sum, s) =>
          sum +
          s.modules.reduce(
            (acc, m) =>
              acc + m.topics.filter((t) => checked[`${s.name}-${t}`]).length,
            0
          ),
        0
      );
      const overallProgress =
        totalTopics > 0 ? Math.round((totalCompleted / totalTopics) * 100) : 0;

      const bestSubject = labels[dataPoints.indexOf(Math.max(...dataPoints))];

      setProgressData({ labels, dataPoints, overallProgress, bestSubject });
    }
  }, [checked]);

  // Chart configurations that are now responsive
  const barChartData = {
    labels: progressData?.labels,
    datasets: [
      {
        label: "% Progress",
        data: progressData?.dataPoints,
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    indexAxis: isMobile ? "y" : "x", // <-- THE KEY CHANGE: 'y' for horizontal on mobile
    responsive: true,
    maintainAspectRatio: !isMobile, // Allow chart to be taller on mobile
    plugins: { legend: { display: !isMobile, labels: { color: "white" } } },
    scales: {
      y: {
        ticks: { color: "white" },
        grid: { color: "rgba(255, 255, 255, 0.1)" },
      },
      x: {
        ticks: { color: "white" },
        grid: { color: "rgba(255, 255, 255, 0.1)" },
      },
    },
  };

  const polarAreaChartData = {
    labels: progressData?.labels,
    datasets: [
      {
        label: "Topics Completed",
        data: progressData?.labels.map((label) => {
          const subject = syllabus.subjects.find((s) => s.name === label);
          return subject.modules.reduce(
            (acc, m) =>
              acc +
              m.topics.filter((t) => checked[`${subject.name}-${t}`]).length,
            0
          );
        }),
        backgroundColor: [
          "rgba(236, 72, 153, 0.5)",
          "rgba(139, 92, 246, 0.5)",
          "rgba(16, 185, 129, 0.5)",
          "rgba(245, 158, 11, 0.5)",
          "rgba(99, 102, 241, 0.5)",
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#1a202c] text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 transition-colors text-white font-semibold px-4 py-2 rounded-lg"
          >
            <Home size={16} />
            Back to Home
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
            <BarChart3 className="w-8 h-8 text-blue-400" />
            Analytics Overview
          </h1>
        </div>

        {!progressData ? (
          <p className="text-center text-gray-400">
            Track some topics in the dashboard to see your analytics!
          </p>
        ) : (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
              <div className="bg-[#2d3748] p-6 rounded-lg">
                <p className="text-sm text-gray-400">Overall Progress</p>
                <p className="text-4xl font-bold text-blue-400">
                  {progressData.overallProgress}%
                </p>
              </div>
              <div className="bg-[#2d3748] p-6 rounded-lg">
                <p className="text-sm text-gray-400">Best Subject</p>
                <p className="text-4xl font-bold text-pink-400">
                  {progressData.bestSubject}
                </p>
              </div>
            </div>

            <div className="bg-[#2d3748] p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">
                Subject Progress Comparison
              </h2>
              <div style={{ height: isMobile ? "400px" : "auto" }}>
                <Bar options={chartOptions} data={barChartData} />
              </div>
            </div>
            <div className="bg-[#2d3748] p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">
                Completed Topics Distribution
              </h2>
              <PolarArea
                data={polarAreaChartData}
                options={{
                  plugins: { legend: { labels: { color: "white" } } },
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
