import { useRef, useState } from 'react';
import { fetchApi } from '../api/client'; // Adjust path to your fetchApi helper

interface CalculationResponse {
  result: number;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Addition() {
  const num1Ref = useRef<HTMLInputElement>(null);
  const num2Ref = useRef<HTMLInputElement>(null);

  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callCalculatorAPI = async () => {
    const val1 = Number(num1Ref.current?.value);
    const val2 = Number(num2Ref.current?.value);

    if (Number.isNaN(val1) || Number.isNaN(val2)) {
      setError('Please enter valid numbers');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await sleep(2000)

      const data = await fetchApi<CalculationResponse>('/cards', {
        method: 'POST',
        body: JSON.stringify({
          n1: val1,
          n2: val2,
        }),
      });

      setResult(data.result);
    } catch (err: any) {
      setError(err.message || 'Failed to calculate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="num1">Number one: </label>
        <input id="num1" ref={num1Ref} type="number" defaultValue={0} />
      </div>

      <div>
        <label htmlFor="num2">Number two: </label>
        <input id="num2" ref={num2Ref} type="number" defaultValue={0} />
      </div>

      <button onClick={callCalculatorAPI} disabled={loading}>
        {loading ? 'Calculating...' : 'Calculate'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result !== null && <p><strong>Result:</strong> {result}</p>}
    </div>
  );
}