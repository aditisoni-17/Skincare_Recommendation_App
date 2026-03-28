import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircleIcon,
  SparklesIcon,
  ShieldCheckIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';
import { useCart } from '../contexts/CartContext.jsx';
import { PRODUCTS } from '../data/products.js';

const productsById = new Map(PRODUCTS.map((product) => [product.id, product]));

function getRecommendedProduct(id, fallbackDescription) {
  const product = productsById.get(id);

  if (!product) {
    return null;
  }

  return {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    description: fallbackDescription || product.description,
  };
}

const questions = [
  {
    id: 'skinType',
    question: 'What best describes your skin type?',
    options: [
      { value: 'normal', label: 'Normal, balanced, and comfortable' },
      { value: 'dry', label: 'Dry, tight, or flaky' },
      { value: 'oily', label: 'Oily and shine-prone' },
      { value: 'combination', label: 'Combination with an oily T-zone' },
      { value: 'sensitive', label: 'Sensitive or easily irritated' },
    ],
    tip: 'Wash your face and wait about 30 minutes before checking how it feels without products.',
  },
  {
    id: 'concerns',
    question: 'What are your main skin concerns?',
    options: [
      { value: 'acne', label: 'Acne and breakouts' },
      { value: 'aging', label: 'Fine lines and wrinkles' },
      { value: 'darkSpots', label: 'Dark spots and uneven tone' },
      { value: 'redness', label: 'Redness and irritation' },
      { value: 'dryness', label: 'Dryness and dehydration' },
      { value: 'oiliness', label: 'Excess oil production' },
      { value: 'pores', label: 'Visible pores' },
      { value: 'dullness', label: 'Dull complexion' },
    ],
    multiple: true,
    tip: 'Select every concern that feels relevant right now. The routine can account for more than one priority.',
  },
  {
    id: 'sensitivity',
    question: 'How sensitive is your skin?',
    options: [
      { value: 'notSensitive', label: 'Not sensitive' },
      { value: 'slightlySensitive', label: 'Slightly sensitive' },
      { value: 'moderatelySensitive', label: 'Moderately sensitive' },
      { value: 'verySensitive', label: 'Very sensitive' },
    ],
    tip: 'Sensitivity can change with weather, stress, or introducing too many actives at once.',
  },
  {
    id: 'lifestyle',
    question: 'What best describes your lifestyle?',
    options: [
      { value: 'active', label: 'Active and outdoors often' },
      { value: 'sedentary', label: 'Mostly indoors' },
      { value: 'stressful', label: 'Busy and high-stress' },
    ],
    tip: 'Lifestyle shapes how much hydration, cleansing, and barrier support your routine may need.',
  },
  {
    id: 'environment',
    question: 'What environment do you spend most of your time in?',
    options: [
      { value: 'dry', label: 'Dry climate' },
      { value: 'humid', label: 'Humid climate' },
      { value: 'polluted', label: 'Urban or polluted area' },
      { value: 'temperate', label: 'Temperate climate' },
    ],
    tip: 'Pollution, humidity, and dryness all change what your skin needs from day to day.',
  },
  {
    id: 'routine',
    question: 'How would you describe your current routine?',
    options: [
      { value: 'minimal', label: 'Minimal, mostly cleansing only' },
      { value: 'basic', label: 'Basic, cleanser and moisturizer' },
      { value: 'moderate', label: 'Consistent multi-step routine' },
      { value: 'extensive', label: 'Extensive, many products and actives' },
    ],
    tip: 'The best routine is the one you can realistically follow every day.',
  },
];

const SkinTest = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectionError, setSelectionError] = useState('');
  const successTimeoutRef = useRef(null);

  const current = questions[currentQuestion];
  const progress = Math.round(((currentQuestion + 1) / questions.length) * 100);

  const handleAnswer = (value) => {
    setSelectionError('');

    if (current.multiple) {
      setAnswers((prev) => ({
        ...prev,
        [current.id]: {
          ...prev[current.id],
          [value]: !prev[current.id]?.[value],
        },
      }));
      return;
    }

    setAnswers((prev) => ({ ...prev, [current.id]: value }));
  };

  const hasSelection = () => {
    if (current.multiple) {
      return Object.values(answers[current.id] || {}).some(Boolean);
    }
    return Boolean(answers[current.id]);
  };

  const handleNext = () => {
    if (!hasSelection()) {
      setSelectionError('Please select at least one option before continuing.');
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setShowTips(false);
      setSelectionError('');
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion === 0) return;
    setCurrentQuestion((prev) => prev - 1);
    setShowTips(false);
    setSelectionError('');
  };

  const results = useMemo(() => {
    if (!showResults) return null;

    const skinType = answers.skinType;
    const concerns = Object.entries(answers.concerns || {})
      .filter(([, selected]) => selected)
      .map(([key]) => key);
    const environment = answers.environment;

    const recommendations = [];
    const dailyRoutine = [];
    const tips = [];
    const recommendedProducts = [];

    if (skinType === 'dry') {
      recommendations.push('Use a gentle hydrating cleanser and a richer barrier-supporting moisturizer.');
      dailyRoutine.push('Morning: Cleanse, hydrating serum, rich moisturizer, SPF.');
      dailyRoutine.push('Evening: Cleanse, hydrating serum, nourishing cream.');
      tips.push('Avoid harsh cleansers and very hot water.');
      recommendedProducts.push(
        getRecommendedProduct(1, "Removes impurities without stripping the skin's moisture barrier."),
        getRecommendedProduct(3, 'Deep hydration for dry or tight-feeling skin.')
      );
    } else if (skinType === 'oily') {
      recommendations.push('Keep cleansing gentle and use lightweight hydration instead of skipping moisturizer.');
      dailyRoutine.push('Morning: Cleanse, lightweight moisturizer, SPF.');
      dailyRoutine.push('Evening: Cleanse, balancing treatment, gel moisturizer.');
      tips.push('Blot excess oil instead of overwashing.');
      recommendedProducts.push(
        getRecommendedProduct(1, 'Balanced cleansing for oily or breakout-prone routines.'),
        getRecommendedProduct(6, 'Weekly pore-refining treatment for shine control.')
      );
    } else if (skinType === 'combination') {
      recommendations.push('Balance hydration so oily and dry areas both feel supported.');
      dailyRoutine.push('Morning: Cleanse, lightweight serum, targeted moisturizer, SPF.');
      dailyRoutine.push('Evening: Cleanse, gentle exfoliation 2 to 3 times weekly, moisturizer.');
      tips.push('Treat the T-zone and cheeks based on what each area needs.');
      recommendedProducts.push(
        getRecommendedProduct(1, 'Balanced cleansing for mixed skin needs.'),
        getRecommendedProduct(3, 'A flexible hydrator that works well for drier areas.')
      );
    } else if (skinType === 'sensitive') {
      recommendations.push('Stick with fragrance-free products and a simple routine.');
      dailyRoutine.push('Morning: Gentle cleanse, soothing serum, moisturizer, mineral SPF.');
      dailyRoutine.push('Evening: Gentle cleanse, barrier serum, moisturizer.');
      tips.push('Patch test new products before full use.');
      recommendedProducts.push(
        getRecommendedProduct(1, 'A gentle base for easily irritated skin.'),
        getRecommendedProduct(3, 'Comforting moisture for sensitive routines.')
      );
    } else {
      recommendations.push('Maintain consistency with a simple cleanse, hydrate, and protect routine.');
      dailyRoutine.push('Morning: Cleanse, serum, moisturizer, SPF.');
      dailyRoutine.push('Evening: Cleanse, treatment, moisturizer.');
      recommendedProducts.push(
        getRecommendedProduct(2, 'Brightening support for a healthy everyday glow.')
      );
    }

    if (concerns.includes('acne')) {
      recommendations.push('Use breakout-friendly ingredients without over-drying your skin.');
      tips.push('Avoid picking blemishes to reduce post-acne marks.');
    }
    if (concerns.includes('aging')) {
      recommendations.push('Support collagen and brightness with vitamin C and a retinol routine.');
      tips.push('Consistent SPF is one of the best anti-aging habits.');
      recommendedProducts.push(
        getRecommendedProduct(2, 'Helps brighten and even skin tone.'),
        getRecommendedProduct(5, 'Night support for smoother texture and firmer-looking skin.')
      );
    }
    if (concerns.includes('darkSpots')) {
      recommendations.push('Focus on brightening ingredients and daily sun protection.');
      tips.push('Tone-evening products work best with consistent, long-term use.');
    }

    if (environment === 'dry') {
      tips.push('Use a humidifier or richer moisturizer when the air feels dry.');
    } else if (environment === 'humid') {
      tips.push('Lightweight textures help skin feel comfortable in humid weather.');
    } else if (environment === 'polluted') {
      tips.push('Double cleansing in the evening can help remove daily buildup.');
    }

    return {
      skinType,
      concerns,
      recommendations,
      dailyRoutine,
      tips,
      recommendedProducts: recommendedProducts.filter(
        (product, index, list) =>
          product && list.findIndex((item) => item?.id === product.id) === index
      ),
    };
  }, [answers, showResults]);

  const isSelected = (optionValue) => {
    if (current.multiple) return answers[current.id]?.[optionValue];
    return answers[current.id] === optionValue;
  };

  const addToCart = (product) => {
    addItem(product, 1);
    setShowSuccess(true);
    window.clearTimeout(successTimeoutRef.current);
    successTimeoutRef.current = window.setTimeout(() => setShowSuccess(false), 2200);
  };

  useEffect(() => {
    return () => {
      window.clearTimeout(successTimeoutRef.current);
    };
  }, []);

  return (
    <div className="page-shell">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="page-title">Skin care assessment</h1>
          <p className="page-subtitle mx-auto">
            Answer a few questions to get tailored routine suggestions, practical skincare tips, and matching product recommendations.
          </p>
        </div>

        {!showResults ? (
          <section className="surface-card p-6 sm:p-8">
            <div className="mb-8">
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="text-slate-500">{progress}% complete</span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-200">
                <div
                  className="h-2.5 rounded-full bg-pink-600 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">{current.question}</h2>
                <p className="mt-2 text-sm text-slate-500">
                  {current.multiple ? 'Choose all options that apply.' : 'Choose one option to continue.'}
                </p>
              </div>
              <button
                onClick={() => setShowTips((prev) => !prev)}
                className="btn-secondary shrink-0 px-4 py-2.5"
              >
                <LightBulbIcon className="mr-2 h-5 w-5" />
                {showTips ? 'Hide tip' : 'Show tip'}
              </button>
            </div>

            {showTips && (
              <div className="status-banner status-banner-info mt-6">
                {current.tip}
              </div>
            )}

            <div className="mt-6 grid gap-3">
              {current.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className={`rounded-2xl border px-4 py-4 text-left text-sm font-medium transition sm:px-5 ${
                    isSelected(option.value)
                      ? 'border-pink-300 bg-pink-50 text-pink-700 shadow-sm'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-pink-200 hover:bg-rose-50/60'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {selectionError && <p className="error-text mt-4">{selectionError}</p>}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="btn-secondary disabled:opacity-50"
              >
                Previous
              </button>
              <button onClick={handleNext} className="btn-primary min-w-[160px]">
                {currentQuestion === questions.length - 1 ? 'Get results' : 'Next'}
              </button>
            </div>
          </section>
        ) : (
          <section className="surface-card p-6 sm:p-8">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-pink-50 text-pink-600">
                <CheckCircleIcon className="h-8 w-8" />
              </div>
              <h2 className="mt-5 text-3xl font-semibold text-slate-900">Your personalized skincare plan</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                A lightweight routine and product set based on your answers.
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div className="soft-panel p-5">
                <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-500">Skin type</p>
                <p className="mt-3 text-lg font-semibold capitalize text-slate-900">{results.skinType}</p>
              </div>
              <div className="soft-panel p-5">
                <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-500">Main concerns</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {results.concerns.length > 0 ? (
                    results.concerns.map((concern) => (
                      <span key={concern} className="badge bg-pink-100 text-pink-700">
                        {concern.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-500">No concerns selected</span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Daily routine</h3>
                <ul className="mt-4 space-y-3">
                  {results.dailyRoutine.map((step) => (
                    <li key={step} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                      <SparklesIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-pink-500" />
                      <span className="text-sm leading-6 text-slate-700">{step}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="mt-8 text-xl font-semibold text-slate-900">Tips and advice</h3>
                <ul className="mt-4 space-y-3">
                  {results.tips.map((tip) => (
                    <li key={tip} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                      <ShieldCheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-pink-500" />
                      <span className="text-sm leading-6 text-slate-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900">Recommended products</h3>
                <div className="mt-4 grid gap-4">
                  {results.recommendedProducts.map((product) => (
                    <article key={product.id} className="surface-card overflow-hidden">
                      <div className="grid gap-4 sm:grid-cols-[132px_1fr]">
                        <img src={product.image} alt={product.name} className="h-40 w-full object-cover sm:h-full" />
                        <div className="p-5 sm:pl-0 sm:pr-5">
                          <h4 className="text-lg font-semibold text-slate-900">{product.name}</h4>
                          <p className="mt-2 text-sm leading-6 text-slate-600">{product.description}</p>
                          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <span className="text-lg font-semibold text-slate-900">${product.price.toFixed(2)}</span>
                            <button onClick={() => addToCart(product)} className="btn-primary">
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-slate-900">Key recommendations</h3>
              <ul className="mt-4 space-y-3">
                {results.recommendations.map((recommendation) => (
                  <li key={recommendation} className="rounded-2xl bg-rose-50 p-4 text-sm leading-6 text-slate-700">
                    {recommendation}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button onClick={() => navigate('/products')} className="btn-primary">
                View all products
              </button>
              <button
                onClick={() => {
                  setCurrentQuestion(0);
                  setAnswers({});
                  setShowResults(false);
                  setSelectionError('');
                }}
                className="btn-secondary"
              >
                Retake test
              </button>
            </div>
          </section>
        )}
      </div>

      {showSuccess && (
        <div className="fixed right-4 top-24 z-50 max-w-sm rounded-2xl border border-emerald-200 bg-white px-4 py-3 shadow-lg shadow-emerald-100">
          <div className="flex items-start gap-3">
            <CheckCircleIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
            <div>
              <p className="text-sm font-semibold text-slate-900">Added to cart</p>
              <p className="mt-1 text-sm text-slate-600">The recommendation was added to your cart.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkinTest;
