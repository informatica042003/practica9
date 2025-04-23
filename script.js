document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('chartForm');
    const ctx = document.getElementById('myChart').getContext('2d');
    let myChart = null;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const chartType = document.getElementById('chartType').value;
        const dataType = document.getElementById('dataType').value;
        const chartTitle = document.getElementById('chartTitle').value || 'Gráfico';
        
        if (!chartType || !dataType) {
            alert('Por favor seleccione el tipo de gráfico y los datos a mostrar');
            return;
        }
        
        // Obtener datos según la selección
        const { labels, data, backgroundColor, borderColor } = getChartData(dataType);
        
        // Destruir el gráfico anterior si existe
        if (myChart) {
            myChart.destroy();
        }
        
        // Crear nuevo gráfico
        myChart = new Chart(ctx, {
            type: chartType,
            data: {
                labels: labels,
                datasets: [{
                    label: chartTitle,
                    data: data,
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: chartTitle,
                        font: {
                            size: 18
                        }
                    },
                    legend: {
                        position: 'top',
                    }
                },
                scales: chartType === 'radar' ? {} : {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });
    
    // Función para proporcionar datos según la selección
    function getChartData(dataType) {
        const dataSets = {
            sales: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                data: [65, 59, 80, 81, 56, 55, 40, 72, 68, 90, 85, 95],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)'
            },
            users: {
                labels: ['2019', '2020', '2021', '2022', '2023'],
                data: [120, 190, 300, 450, 600],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)'
            },
            products: {
                labels: ['Electrónicos', 'Ropa', 'Alimentos', 'Hogar', 'Juguetes'],
                data: [300, 150, 200, 180, 120],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ]
            },
            revenue: {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                data: [125000, 150000, 175000, 200000],
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)'
            }
        };
        
        return dataSets[dataType] || dataSets.sales;
    }
});