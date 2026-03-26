import { useMemo, useState } from 'react';
import { getProfileRecommendations } from '../services/productService.js';

const SKIN_TYPES = [
  { value: 'dry', label: 'Dry' },
  { value: 'oily', label: 'Oily' },
  { value: 'combination', label: 'Combination' },
  { value: 'sensitive', label: 'Sensitive' },
];

const CONCERNS = [
  { value: 'acne', label: 'Acne' },
  { value: 'dryness', label: 'Dryness' },
  { value: 'aging', label: 'Aging' },
  { value: 'dullness', label: 'Dullness' },
  { value: 'redness', label: 'Redness' },
];

const RecommendationForm = ({ onSelectProduct, onImageError }) => {
  const [skinType, setSkinType] = useState('dry');
  const [concern, setConcern] = useState('dryness');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const isDisabled = useMemo(() => !skinType || !concern || loading, [skinType, concern, loading]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setHasSearched(true);

    try {
      const data = await getProfileRecommendations({ skinType, concern });
      setRecommendations(data.products || []);
    } catch (requestError) {
      console.error('Failed to load AI recommendations:', requestError);
      setRecommendations([]);
      setError('Unable to load recommendations right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="surface-card mb-8 p-5 sm:p-6">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-slate-900">AI Skin Match</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Choose your skin type and main concern to get quick rule-based product recommendations.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-[1fr_1fr_auto] md:items-end">
        <div>
          <label className="field-label" htmlFor="skinTypeSelect">
            Skin type
          </label>
          <select
            id="skinTypeSelect"
            value={skinType}
            onChange={(event) => setSkinType(event.target.value)}
            className="input-base"
          >
            {SKIN_TYPES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="field-label" htmlFor="concernSelect">
            Concern
          </label>
          <select
            id="concernSelect"
            value={concern}
            onChange={(event) => setConcern(event.target.value)}
            className="input-base"
          >
            {CONCERNS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn-primary" disabled={isDisabled}>
          {loading ? 'Finding matches...' : 'Get recommendations'}
        </button>
      </form>

      {error && <div className="status-banner status-banner-error mt-5">{error}</div>}

      {loading ? (
        <p className="mt-5 text-sm text-slate-600">Finding your best matches...</p>
      ) : hasSearched && recommendations.length === 0 && !error ? (
        <p className="mt-5 text-sm text-slate-600">No recommendations found for this combination yet.</p>
      ) : recommendations.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {recommendations.map((product) => (
            <article key={product.id} className="rounded-2xl border border-slate-200 bg-white p-4">
              <img
                src={product.image}
                alt={product.name}
                className="h-40 w-full rounded-xl object-cover"
                onError={onImageError}
              />
              <h3 className="mt-3 text-sm font-semibold text-slate-900">{product.name}</h3>
              <p className="mt-1 text-xs text-slate-500">{product.category}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{product.description}</p>
              <div className="mt-3 flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-slate-900">
                  ${Number(product.price).toFixed(2)}
                </span>
                <button
                  type="button"
                  onClick={() => onSelectProduct?.(product)}
                  className="btn-secondary"
                >
                  View details
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
};

export default RecommendationForm;
