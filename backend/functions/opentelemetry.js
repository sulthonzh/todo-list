"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_node_1 = require("@opentelemetry/sdk-node");
const auto_instrumentations_node_1 = require("@opentelemetry/auto-instrumentations-node");
const exporter_prometheus_1 = require("@opentelemetry/exporter-prometheus");
const sdk_trace_base_1 = require("@opentelemetry/sdk-trace-base");
const prometheusExporter = new exporter_prometheus_1.PrometheusExporter({
    port: 9464,
});
const sdk = new sdk_node_1.NodeSDK({
    traceExporter: new sdk_trace_base_1.ConsoleSpanExporter(),
    metricReader: prometheusExporter,
    instrumentations: [(0, auto_instrumentations_node_1.getNodeAutoInstrumentations)()],
});
prometheusExporter.startServer().then(() => {
    console.log(`Prometheus scrape endpoint: http://localhost:9464/metrics`);
    sdk.start();
    console.log('Tracing initialized');
});
//# sourceMappingURL=opentelemetry.js.map