import consumer from "./consumer";

const initReportsCable = () => {
  const reportsTrigger = document.getElementById('reports');
  const reportsContainer = document.getElementById('reports-container')
  if (reportsTrigger) {
    console.log('connected')
    consumer.subscriptions.create({ channel: "ReportsChannel", name: 'reports'}, {
      received(data) {
        if (data.action == 'destroy') {
          document.getElementById(`report-${data.json.id}`).remove();
        }
        else if ( data.action == 'create') {
          // called when data is broadcast in the cable
          reportsContainer.insertAdjacentHTML('beforeend', data.partial);
          const mapElement = document.getElementById('map');
          mapElement.dataset.report = JSON.stringify(
          {
            lat: data.json.latitude,
            lng: data.json.longitude
          });
        }
      },
    });
  }
}

export { initReportsCable };
