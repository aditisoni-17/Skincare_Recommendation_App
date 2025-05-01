import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaceSmileIcon,
  FaceFrownIcon,
  SunIcon,
  MoonIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  SparklesIcon,
  HeartIcon,
  ShieldCheckIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';

const SkinTest = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const questions = [
    {
      id: 'skinType',
      question: 'What best describes your skin type?',
      options: [
        { value: 'normal', label: 'Normal - Balanced, not too oily or dry' },
        { value: 'dry', label: 'Dry - Feels tight, flaky, or rough' },
        { value: 'oily', label: 'Oily - Shiny, prone to breakouts' },
        { value: 'combination', label: 'Combination - Oily T-zone, dry cheeks' },
        { value: 'sensitive', label: 'Sensitive - Easily irritated or red' },
      ],
      tip: 'Wash your face and wait 30 minutes before determining your skin type. Observe how your skin feels and looks.',
    },
    {
      id: 'concerns',
      question: 'What are your main skin concerns? (Select all that apply)',
      options: [
        { value: 'acne', label: 'Acne and breakouts' },
        { value: 'aging', label: 'Fine lines and wrinkles' },
        { value: 'darkSpots', label: 'Dark spots and hyperpigmentation' },
        { value: 'redness', label: 'Redness and irritation' },
        { value: 'dryness', label: 'Dryness and dehydration' },
        { value: 'oiliness', label: 'Excess oil production' },
        { value: 'pores', label: 'Large pores' },
        { value: 'dullness', label: 'Dull complexion' },
      ],
      multiple: true,
      tip: 'Consider both immediate concerns and long-term goals for your skin.',
    },
    {
      id: 'sensitivity',
      question: 'How sensitive is your skin?',
      options: [
        { value: 'notSensitive', label: 'Not sensitive at all' },
        { value: 'slightlySensitive', label: 'Slightly sensitive' },
        { value: 'moderatelySensitive', label: 'Moderately sensitive' },
        { value: 'verySensitive', label: 'Very sensitive' },
      ],
      tip: 'Sensitivity can be affected by weather, products, and stress levels.',
    },
    {
      id: 'lifestyle',
      question: 'What best describes your lifestyle?',
      options: [
        { value: 'active', label: 'Active - Regular exercise, outdoor activities' },
        { value: 'sedentary', label: 'Sedentary - Mostly indoor, limited physical activity' },
        { value: 'stressful', label: 'High-stress - Busy schedule, irregular routine' },
      ],
      tip: 'Your lifestyle affects your skin\'s needs and how it responds to products.',
    },
    {
      id: 'environment',
      question: 'What environment do you spend most of your time in?',
      options: [
        { value: 'dry', label: 'Dry climate' },
        { value: 'humid', label: 'Humid climate' },
        { value: 'polluted', label: 'Urban/polluted area' },
        { value: 'temperate', label: 'Temperate climate' },
      ],
      tip: 'Environmental factors can significantly impact your skin\'s condition.',
    },
    {
      id: 'routine',
      question: 'How would you describe your current skincare routine?',
      options: [
        { value: 'minimal', label: 'Minimal - Basic cleansing only' },
        { value: 'basic', label: 'Basic - Cleanser and moisturizer' },
        { value: 'moderate', label: 'Moderate - Multiple steps, consistent' },
        { value: 'extensive', label: 'Extensive - Full routine, multiple products' },
      ],
      tip: 'Be honest about your current routine to get the most accurate recommendations.',
    },
  ];

  const handleAnswer = (value) => {
    if (questions[currentQuestion].multiple) {
      setAnswers((prev) => ({
        ...prev,
        [questions[currentQuestion].id]: {
          ...prev[questions[currentQuestion].id],
          [value]: !prev[questions[currentQuestion].id]?.[value],
        },
      }));
    } else {
      setAnswers((prev) => ({
        ...prev,
        [questions[currentQuestion].id]: value,
      }));
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setShowTips(false);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setShowTips(false);
    }
  };

  const calculateResults = () => {
    const skinType = answers.skinType;
    const concerns = Object.entries(answers.concerns || {})
      .filter(([_, selected]) => selected)
      .map(([key]) => key);
    const sensitivity = answers.sensitivity;
    const lifestyle = answers.lifestyle;
    const environment = answers.environment;
    const routine = answers.routine;

    let recommendations = [];
    let dailyRoutine = [];
    let tips = [];
    let recommendedProducts = [];

    // Skin type specific recommendations and products
    if (skinType === 'dry') {
      recommendations.push('Use a gentle, hydrating cleanser');
      recommendations.push('Apply a rich moisturizer twice daily');
      recommendations.push('Consider adding a hydrating serum');
      dailyRoutine.push('Morning: Cleanse, Hydrating Serum, Rich Moisturizer, SPF');
      dailyRoutine.push('Evening: Cleanse, Hydrating Serum, Rich Moisturizer');
      tips.push('Avoid hot showers and harsh cleansers');
      tips.push('Consider using a humidifier in dry environments');
      recommendedProducts.push({
        id: 1,
        name: 'Hydrating Cleanser',
        price: 24.99,
        image: '/images/cleanser.jpg',
        description: 'Gentle cleanser that removes impurities while maintaining skin\'s moisture barrier.',
      });
      recommendedProducts.push({
        id: 3,
        name: 'Moisturizing Cream',
        price: 29.99,
        image: '/images/moisturizer.jpg',
        description: 'Rich cream that deeply hydrates and nourishes dry skin.',
      });
    } else if (skinType === 'oily') {
      recommendations.push('Use an oil-free, gentle cleanser');
      recommendations.push('Apply a lightweight, oil-free moisturizer');
      recommendations.push('Consider using a clay mask weekly');
      dailyRoutine.push('Morning: Cleanse, Oil-Free Moisturizer, SPF');
      dailyRoutine.push('Evening: Cleanse, Clay Mask (2-3x weekly), Light Moisturizer');
      tips.push('Blotting papers can help control shine throughout the day');
      tips.push('Don\'t skip moisturizer - it helps balance oil production');
      recommendedProducts.push({
        id: 1,
        name: 'Hydrating Cleanser',
        price: 24.99,
        image: '/images/cleanser.jpg',
        description: 'Gentle cleanser that removes impurities while maintaining skin\'s moisture barrier.',
      });
      recommendedProducts.push({
        id: 6,
        name: 'Clay Mask',
        price: 27.99,
        image: '/images/mask.jpg',
        description: 'Purifying mask that draws out impurities and refines pores.',
      });
    } else if (skinType === 'combination') {
      recommendations.push('Use a balanced cleanser');
      recommendations.push('Apply different moisturizers to different areas');
      recommendations.push('Consider using a gentle exfoliant');
      dailyRoutine.push('Morning: Cleanse, Light Moisturizer (T-zone), Rich Moisturizer (cheeks), SPF');
      dailyRoutine.push('Evening: Cleanse, Exfoliate (2-3x weekly), Moisturize');
      tips.push('Use different products for different areas of your face');
      tips.push('Focus on balancing your skin\'s needs');
    } else if (skinType === 'sensitive') {
      recommendations.push('Use fragrance-free, gentle products');
      recommendations.push('Apply a soothing moisturizer');
      recommendations.push('Avoid harsh exfoliants');
      dailyRoutine.push('Morning: Gentle Cleanse, Soothing Serum, Gentle Moisturizer, Mineral SPF');
      dailyRoutine.push('Evening: Gentle Cleanse, Soothing Serum, Gentle Moisturizer');
      tips.push('Patch test new products before full application');
      tips.push('Avoid products with alcohol and fragrances');
    }

    // Concern-specific recommendations and products
    if (concerns.includes('acne')) {
      recommendations.push('Use a salicylic acid cleanser');
      recommendations.push('Apply a spot treatment as needed');
      tips.push('Don\'t pick at blemishes - it can cause scarring');
      tips.push('Change pillowcases regularly to prevent bacteria buildup');
      recommendedProducts.push({
        id: 1,
        name: 'Hydrating Cleanser',
        price: 24.99,
        image: '/images/cleanser.jpg',
        description: 'Gentle cleanser that removes impurities while maintaining skin\'s moisture barrier.',
      });
    }
    if (concerns.includes('aging')) {
      recommendations.push('Use a retinol product at night');
      recommendations.push('Apply a vitamin C serum in the morning');
      tips.push('Always wear SPF to prevent further aging');
      tips.push('Stay hydrated and maintain a healthy diet');
      recommendedProducts.push({
        id: 2,
        name: 'Vitamin C Serum',
        price: 39.99,
        image: '/images/serum.jpg',
        description: 'Brightening serum with 20% vitamin C for radiant, even-toned skin.',
      });
      recommendedProducts.push({
        id: 5,
        name: 'Retinol Night Cream',
        price: 49.99,
        image: '/images/retinol.jpg',
        description: 'Anti-aging cream with encapsulated retinol for gentle yet effective results.',
      });
    }
    if (concerns.includes('darkSpots')) {
      recommendations.push('Use a brightening serum');
      recommendations.push('Apply sunscreen daily');
      tips.push('Be consistent with your brightening routine');
      tips.push('Protect your skin from sun exposure');
    }

    // Environment-specific tips
    if (environment === 'dry') {
      tips.push('Use a humidifier to add moisture to the air');
      tips.push('Consider using a heavier moisturizer during winter months');
    } else if (environment === 'humid') {
      tips.push('Use lightweight, oil-free products');
      tips.push('Blot excess oil throughout the day');
    } else if (environment === 'polluted') {
      tips.push('Double cleanse in the evening to remove pollutants');
      tips.push('Use antioxidant-rich products to combat free radicals');
    }

    return {
      skinType,
      concerns,
      recommendations,
      dailyRoutine,
      tips,
      recommendedProducts,
    };
  };

  const results = showResults ? calculateResults() : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Skin Care Assessment
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Answer a few questions to get personalized skin care recommendations
          </p>
        </div>

        {!showResults ? (
          <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="text-sm text-gray-500">
                  {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-pink-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {questions[currentQuestion].question}
                </h3>
                <button
                  onClick={() => setShowTips(!showTips)}
                  className="text-pink-600 hover:text-pink-700"
                >
                  <LightBulbIcon className="h-5 w-5" />
                </button>
              </div>

              {showTips && (
                <div className="mb-4 p-4 bg-pink-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    {questions[currentQuestion].tip}
                  </p>
                </div>
              )}

              <div className="space-y-3">
                {questions[currentQuestion].options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition-colors duration-200 ${
                      questions[currentQuestion].multiple
                        ? answers[questions[currentQuestion].id]?.[option.value]
                          ? 'border-pink-500 bg-pink-50'
                          : 'border-gray-200 hover:border-pink-300'
                        : answers[questions[currentQuestion].id] === option.value
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-gray-200 hover:border-pink-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  currentQuestion === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 rounded-md text-sm font-medium text-white bg-pink-600 hover:bg-pink-700"
              >
                {currentQuestion === questions.length - 1 ? 'Get Results' : 'Next'}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
            <div className="text-center mb-8">
              <CheckCircleIcon className="mx-auto h-12 w-12 text-pink-500" />
              <h3 className="mt-2 text-xl font-medium text-gray-900">
                Your Personalized Skin Care Plan
              </h3>
            </div>

            <div className="space-y-8">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Skin Type</h4>
                <p className="mt-1 text-lg text-gray-900 capitalize">
                  {results.skinType}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">
                  Main Concerns
                </h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {results.concerns.map((concern) => (
                    <span
                      key={concern}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-pink-100 text-pink-800"
                    >
                      {concern.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">
                  Daily Routine
                </h4>
                <ul className="mt-2 space-y-2">
                  {results.dailyRoutine.map((step, index) => (
                    <li
                      key={index}
                      className="flex items-start"
                    >
                      <span className="flex-shrink-0 h-5 w-5 text-pink-500">
                        <SparklesIcon className="h-5 w-5" />
                      </span>
                      <span className="ml-2 text-gray-700">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">
                  Recommended Products
                </h4>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.recommendedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-lg shadow overflow-hidden"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h5 className="text-lg font-medium text-gray-900">
                          {product.name}
                        </h5>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.description}
                        </p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-lg font-medium text-gray-900">
                            ${product.price.toFixed(2)}
                          </span>
                          <button
                            onClick={() => {
                              addToCart(product);
                              setShowSuccess(true);
                              setTimeout(() => setShowSuccess(false), 3000);
                            }}
                            className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">
                  Tips & Advice
                </h4>
                <ul className="mt-2 space-y-2">
                  {results.tips.map((tip, index) => (
                    <li
                      key={index}
                      className="flex items-start"
                    >
                      <span className="flex-shrink-0 h-5 w-5 text-pink-500">
                        <ShieldCheckIcon className="h-5 w-5" />
                      </span>
                      <span className="ml-2 text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {showSuccess && (
                <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                  Product added to cart successfully!
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-center space-x-4">
              <button
                onClick={() => navigate('/products')}
                className="px-4 py-2 rounded-md text-sm font-medium text-white bg-pink-600 hover:bg-pink-700"
              >
                View All Products
              </button>
              <button
                onClick={() => {
                  setCurrentQuestion(0);
                  setAnswers({});
                  setShowResults(false);
                }}
                className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200"
              >
                Retake Test
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkinTest; 