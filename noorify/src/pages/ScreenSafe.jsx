import { 
  EyeIcon, 
  ShieldCheckIcon, 
  ClockIcon, 
  SunIcon,
  AdjustmentsHorizontalIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline';

const ScreenSafe = () => {
  const tips = [
    {
      icon: EyeIcon,
      title: 'Eye Care',
      description: 'Follow the 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds.',
      tips: [
        'Blink frequently to keep your eyes moist',
        'Use artificial tears if your eyes feel dry',
        'Position your screen at arm\'s length',
        'Keep the top of your screen at eye level',
      ],
    },
    {
      icon: ShieldCheckIcon,
      title: 'Screen Protection',
      description: 'Keep your screens clean and protected from damage.',
      tips: [
        'Use a microfiber cloth for cleaning',
        'Avoid using harsh chemicals',
        'Install screen protectors',
        'Keep screens away from direct sunlight',
      ],
    },
    {
      icon: ClockIcon,
      title: 'Time Management',
      description: 'Manage your screen time effectively to prevent eye strain.',
      tips: [
        'Take regular breaks',
        'Set screen time limits',
        'Use blue light filters in the evening',
        'Avoid screens before bedtime',
      ],
    },
    {
      icon: SunIcon,
      title: 'Lighting',
      description: 'Proper lighting is essential for comfortable screen viewing.',
      tips: [
        'Avoid glare from windows and lights',
        'Use ambient lighting',
        'Adjust screen brightness to match room lighting',
        'Use anti-glare filters if needed',
      ],
    },
    {
      icon: AdjustmentsHorizontalIcon,
      title: 'Display Settings',
      description: 'Optimize your display settings for better viewing comfort.',
      tips: [
        'Adjust text size and contrast',
        'Use dark mode when appropriate',
        'Enable night mode in the evening',
        'Calibrate your display colors',
      ],
    },
    {
      icon: ComputerDesktopIcon,
      title: 'Ergonomics',
      description: 'Maintain proper posture and setup for comfortable screen use.',
      tips: [
        'Keep your back straight and supported',
        'Position your keyboard and mouse comfortably',
        'Use a chair with good lumbar support',
        'Keep your feet flat on the floor',
      ],
    },
  ];

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Screen Safety Guidelines
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Follow these tips to protect your eyes and maintain healthy screen habits
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tips.map((tip) => (
            <div
              key={tip.title}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <tip.icon className="h-8 w-8 text-blue-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {tip.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {tip.description}
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <ul className="space-y-3">
                    {tip.tips.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-green-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="ml-3 text-sm text-gray-700">{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Need More Help?
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Our team of experts is here to help you with any screen care questions
            </p>
            <div className="mt-6">
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenSafe; 