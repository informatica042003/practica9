document.addEventListener('DOMContentLoaded', function() {
    // Definir el orden de los meses
    const monthOrder = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    
    // Inicializar datos
    let chartData = {
        labels: [],
        values: []
    };
    
    // Obtener elementos del DOM
    const form = document.getElementById('dataForm');
    const monthSelect = document.getElementById('month');
    const populationInput = document.getElementById('population');
    const resetBtn = document.getElementById('resetBtn');
    
    // Configurar el gráfico con estilo moderno
    const ctx = document.getElementById('populationChart').getContext('2d');
    
    // Gradiente para el área del gráfico
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(74, 222, 128, 0.2)');
    gradient.addColorStop(1, 'rgba(74, 222, 128, 0)');
    
    let populationChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartData.labels,
            datasets: [{
                label: 'Población',
                data: chartData.values,
                backgroundColor: gradient,
                borderColor: '#4ADE80',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#4ADE80',
                pointBorderColor: '#0F172A',
                pointHoverRadius: 8,
                pointHoverBorderWidth: 3,
                pointRadius: 5,
                pointHitRadius: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#94A3B8'
                    },
                    title: {
                        display: true,
                        text: 'Cantidad de Población',
                        color: '#E2E8F0'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#94A3B8'
                    },
                    title: {
                        display: true,
                        text: 'Meses',
                        color: '#E2E8F0'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#E2E8F0',
                        font: {
                            size: 14
                        },
                        boxWidth: 0,
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: '#1E293B',
                    titleColor: '#E2E8F0',
                    bodyColor: '#CBD5E1',
                    borderColor: '#4ADE80',
                    borderWidth: 1,
                    padding: 12,
                    usePointStyle: true,
                    callbacks: {
                        label: function(context) {
                            return ` ${context.parsed.y} habitantes`;
                        }
                    }
                }
            }
        }
    });
    
    // Manejar el envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const month = monthSelect.value;
        const population = parseInt(populationInput.value);
        
        // Verificar si el mes ya existe
        const existingIndex = chartData.labels.indexOf(month);
        if (existingIndex !== -1) {
            // Actualizar valor existente
            chartData.values[existingIndex] = population;
        } else {
            // Agregar nuevo dato
            chartData.labels.push(month);
            chartData.values.push(population);
            
            // Ordenar los meses según el orden definido
            const sortedData = chartData.labels
                .map((label, index) => ({
                    label,
                    value: chartData.values[index]
                }))
                .sort((a, b) => monthOrder.indexOf(a.label) - monthOrder.indexOf(b.label));
            
            // Actualizar los datos ordenados
            chartData.labels = sortedData.map(item => item.label);
            chartData.values = sortedData.map(item => item.value);
        }
        
        // Actualizar el gráfico
        updateChart();
        
        // Resetear el formulario
        form.reset();
        monthSelect.focus();
        
        // Efecto de confirmación
        const submitBtn = e.submitter;
        submitBtn.innerHTML = '<span class="btn-icon">✓</span> Datos Agregados';
        setTimeout(() => {
            submitBtn.innerHTML = '<span class="btn-icon">+</span> Agregar Datos';
        }, 2000);
    });
    
    // Manejar el botón de reinicio
    resetBtn.addEventListener('click', function() {
        chartData.labels = [];
        chartData.values = [];
        updateChart();
        
        // Efecto de confirmación
        resetBtn.innerHTML = '<span class="btn-icon">✓</span> Gráfico Reiniciado';
        setTimeout(() => {
            resetBtn.innerHTML = '<span class="btn-icon">↻</span> Reiniciar';
        }, 2000);
    });
    
    // Función para actualizar el gráfico
    function updateChart() {
        populationChart.data.labels = chartData.labels;
        populationChart.data.datasets[0].data = chartData.values;
        populationChart.update();
    }
    
    // Cargar datos de ejemplo
    function loadSampleData() {
        chartData.labels = ['Enero', 'Marzo', 'Febrero']; // Desordenado a propósito
        chartData.values = [150, 320, 240];
        
        // Ordenar los datos de ejemplo
        const sortedData = chartData.labels
            .map((label, index) => ({
                label,
                value: chartData.values[index]
            }))
            .sort((a, b) => monthOrder.indexOf(a.label) - monthOrder.indexOf(b.label));
        
        chartData.labels = sortedData.map(item => item.label);
        chartData.values = sortedData.map(item => item.value);
        
        updateChart();
    }
    
    // Cargar datos de ejemplo al inicio
    loadSampleData();
});