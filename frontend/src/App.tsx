import { useEffect, useState } from "react";
import axios from "axios";

type HealthResponse = {
  status: string;
  timestamp: string;
};

function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<HealthResponse>("/api/health")
      .then((res) => setHealth(res.data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <main className="app-shell">
      <section className="card">
        <h1>Invoice Generator Pro</h1>
        <p>Production-ready stack for modern invoicing workflows.</p>
        <div className="status">
          <span className="label">API health:</span>
          {health ? (
            <span className="value success">
              {health.status} @ {new Date(health.timestamp).toLocaleTimeString()}
            </span>
          ) : (
            <span className="value danger">{error ?? "Pending..."}</span>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
