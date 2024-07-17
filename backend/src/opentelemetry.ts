import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base';

const prometheusExporter = new PrometheusExporter({
  port: 9464, // Default port for Prometheus exporter
});

const sdk = new NodeSDK({
  traceExporter: new ConsoleSpanExporter(), // Replace with desired exporter
  metricReader: prometheusExporter,
  instrumentations: [getNodeAutoInstrumentations()],
});

// Start the Prometheus metrics server separately
prometheusExporter.startServer().then(() => {
  console.log(`Prometheus scrape endpoint: http://localhost:9464/metrics`);

  // Start the SDK after the Prometheus server has started
  sdk.start();
  console.log('Tracing initialized');
});
