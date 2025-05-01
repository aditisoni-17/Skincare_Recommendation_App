import { useState } from 'react';
import { 
  EyeIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline';

const ScreenTest = () => {
  const [currentTest, setCurrentTest] = useState(0);
  const [testResults, setTestResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const tests = [
    {
      id: 1,
      title: 'Color Accuracy Test',
      description: 'Check if you can see all the colors clearly in the gradient below.',
      component: (
        <div className="w-full h-64 rounded-lg bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" />
      ),
    },
    {
      id: 2,
      title: 'Brightness Test',
      description: 'Adjust your screen brightness until you can see all the squares clearly.',
      component: (
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className="h-12 rounded bg-gray-800"
              style={{ opacity: 1 - i * 0.04 }}
            />
          ))}
        </div>
      ),
    },
    {
      id: 3,
      title: 'Contrast Test',
      description: 'Check if you can read the text clearly at different contrast levels.',
      component: (
        <div className="space-y-4">
          {[100, 80, 60, 40, 20].map((contrast) => (
            <div
              key={contrast}
              className="p-4 rounded"
              style={{
                backgroundColor: `rgba(0, 0, 0, ${contrast / 100})`,
                color: `rgba(255, 255, 255, ${contrast / 100})`,
              }}
            >
              Contrast Level {contrast}%
            </div>
          ))}
        </div>
      ),
    },
  ];

  const handleTestComplete = (result) => {
    setTestResults([...testResults, result]);
    if (currentTest < tests.length - 1) {
      setCurrentTest(currentTest + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentTest(0);
    setTestResults([]);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Test Results
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Here's how your screen performed in the tests
          </p>
        </div>

        <div className="mt-12 space-y-8">
          {tests.map((test, index) => (
            <div
              key={test.id}
              className="bg-white shadow rounded-lg p-6"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {testResults[index] ? (
                    <CheckCircleIcon className="h-6 w-6 text-green-500" />
                  ) : (
                    <XCircleIcon className="h-6 w-6 text-red-500" />
                  )}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {test.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {testResults[index]
                      ? 'Test completed successfully'
                      : 'Test failed or incomplete'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={handleRestart}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Run Tests Again
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <div className="flex justify-center">
          <EyeIcon className="h-12 w-12 text-blue-500" />
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900 sm:text-4xl">
          {tests[currentTest].title}
        </h2>
        <p className="mt-4 text-lg text-gray-500">
          {tests[currentTest].description}
        </p>
      </div>

      <div className="mt-12">
        <div className="bg-white shadow rounded-lg p-6">
          {tests[currentTest].component}
        </div>
      </div>

      <div className="mt-12 flex justify-center space-x-4">
        <button
          onClick={() => handleTestComplete(true)}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Pass
        </button>
        <button
          onClick={() => handleTestComplete(false)}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Fail
        </button>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Test {currentTest + 1} of {tests.length}
        </p>
      </div>
    </div>
  );
};

export default ScreenTest; 