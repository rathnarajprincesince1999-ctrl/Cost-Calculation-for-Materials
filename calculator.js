// Biochar Cost Calculator - Main JavaScript

// Global variables to track entries
let chemicalCount = 1;
let biomassCount = 1;
let energyCount = 1;
let equipmentCount = 1;
let savedMaterials = []; // Store multiple material calculations

// Initialize calculator on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeCalculator();
    attachEventListeners();
    calculateAll();
});

function initializeCalculator() {
    console.log('Biochar Cost Calculator Initialized');
}

function attachEventListeners() {
    // Add chemical button
    document.getElementById('add-chemical').addEventListener('click', addChemicalEntry);
    
    // Add biomass button
    document.getElementById('add-biomass').addEventListener('click', addBiomassEntry);
    
    // Add energy stage button
    document.getElementById('add-energy').addEventListener('click', addEnergyEntry);
    
    // Add equipment button
    document.getElementById('add-equipment').addEventListener('click', addEquipmentEntry);
    
    // Calculate button
    document.getElementById('calculate-btn').addEventListener('click', calculateAll);
    
    // Export button
    document.getElementById('export-btn').addEventListener('click', exportReport);
    
    // Export Excel button
    document.getElementById('export-excel-btn').addEventListener('click', exportExcelReport);
    
    // Save material button
    document.getElementById('save-material-btn').addEventListener('click', saveMaterial);
    
    // Export all materials button
    document.getElementById('export-all-btn').addEventListener('click', exportAllMaterials);
    
    // Real-time calculation on input change
    document.addEventListener('input', function(e) {
        if (e.target.matches('input[type="number"]') || e.target.matches('.supplier-price')) {
            calculateAll();
        }
    });
}

function addChemicalEntry() {
    chemicalCount++;
    const container = document.getElementById('chemicals-container');
    const newEntry = document.createElement('div');
    newEntry.className = 'chemical-entry';
    newEntry.innerHTML = `
        <h3>Chemical ${chemicalCount}</h3>
        <input type="text" class="chem-name" placeholder="Chemical Name">
        <div class="price-inputs">
            <input type="number" class="supplier-price" placeholder="Supplier 1 (₹/kg)" step="0.01">
            <input type="number" class="supplier-price" placeholder="Supplier 2 (₹/kg)" step="0.01">
            <input type="number" class="supplier-price" placeholder="Supplier 3 (₹/kg)" step="0.01">
            <input type="number" class="supplier-price" placeholder="Supplier 4 (₹/kg)" step="0.01">
            <input type="number" class="supplier-price" placeholder="Supplier 5 (₹/kg)" step="0.01">
        </div>
        <div class="usage-input">
            <label>Mass Used (g):</label>
            <input type="number" class="chem-mass" placeholder="Mass in grams" step="0.01">
        </div>
        <div class="result-display">
            <span>Average Price: ₹<span class="avg-price">0.00</span>/kg</span>
            <span>Cost: ₹<span class="chem-cost">0.00</span></span>
        </div>
    `;
    container.appendChild(newEntry);
    calculateAll();
}

function addBiomassEntry() {
    biomassCount++;
    const container = document.getElementById('biomass-container');
    const newEntry = document.createElement('div');
    newEntry.className = 'biomass-entry';
    newEntry.innerHTML = `
        <input type="text" class="biomass-name" placeholder="Biomass Name">
        <div class="biomass-inputs">
            <label>Price (₹/kg):</label>
            <input type="number" class="biomass-price" placeholder="0 for waste" step="0.01">
            <label>Mass Used (kg):</label>
            <input type="number" class="biomass-mass" placeholder="Mass in kg" step="0.01">
        </div>
        <div class="result-display">
            <span>Cost: ₹<span class="biomass-cost">0.00</span></span>
        </div>
    `;
    container.appendChild(newEntry);
    calculateAll();
}

function addEnergyEntry() {
    energyCount++;
    const container = document.getElementById('energy-container');
    const newEntry = document.createElement('div');
    newEntry.className = 'energy-entry';
    newEntry.innerHTML = `
        <h3>Energy Stage ${energyCount}</h3>
        <input type="text" class="stage-name" placeholder="Stage Name">
        <div class="energy-inputs">
            <label>Power (kW):</label>
            <input type="number" class="power-rating" placeholder="2.5" step="0.1">
            <label>Time (hours):</label>
            <input type="number" class="energy-time" placeholder="8" step="0.1">
        </div>
        <div class="result-display">
            <span>Energy: <span class="energy-kwh">0.00</span> kWh</span>
        </div>
    `;
    container.appendChild(newEntry);
    calculateAll();
}

function addEquipmentEntry() {
    equipmentCount++;
    const container = document.getElementById('equipment-container');
    const newEntry = document.createElement('div');
    newEntry.className = 'equipment-entry';
    newEntry.innerHTML = `
        <h3>Equipment ${equipmentCount}</h3>
        <input type="text" class="equipment-name" placeholder="Equipment Name">
        <div class="equipment-inputs">
            <label>Equipment Cost (₹):</label>
            <input type="number" class="equipment-cost" placeholder="50000" step="0.01">
            <label>Lifespan (years):</label>
            <input type="number" class="equipment-lifespan" placeholder="10" step="1" value="10">
            <label>Operating Hours/Year:</label>
            <input type="number" class="equipment-hours-year" placeholder="2000" step="1" value="2000">
            <label>Usage Hours (this batch):</label>
            <input type="number" class="equipment-usage" placeholder="8" step="0.1">
        </div>
        <div class="result-display">
            <span>Depreciation: ₹<span class="equipment-depreciation">0.00</span></span>
        </div>
    `;
    container.appendChild(newEntry);
    calculateAll();
}

function calculateAll() {
    calculateChemicalCosts();
    calculateBiomassCosts();
    calculatePrecursorCosts();
    calculatePreparationCosts();
    calculateEnergyCosts();
    calculateEquipmentCosts();
    calculateFinalCosts();
}

function calculateChemicalCosts() {
    const chemicalEntries = document.querySelectorAll('.chemical-entry');
    let totalChemicalCost = 0;
    
    chemicalEntries.forEach(entry => {
        const supplierPrices = entry.querySelectorAll('.supplier-price');
        const mass = parseFloat(entry.querySelector('.chem-mass').value) || 0;
        
        // Calculate average price from 5 suppliers
        let sum = 0;
        let count = 0;
        supplierPrices.forEach(input => {
            const price = parseFloat(input.value) || 0;
            if (price > 0) {
                sum += price;
                count++;
            }
        });
        
        const avgPrice = count > 0 ? sum / count : 0;
        const cost = (avgPrice * mass) / 1000; // Convert grams to kg
        
        entry.querySelector('.avg-price').textContent = avgPrice.toFixed(2);
        entry.querySelector('.chem-cost').textContent = cost.toFixed(2);
        
        totalChemicalCost += cost;
    });
    
    document.getElementById('total-chemical-cost').textContent = totalChemicalCost.toFixed(2);
    return totalChemicalCost;
}

function calculateBiomassCosts() {
    const biomassEntries = document.querySelectorAll('.biomass-entry');
    let totalBiomassCost = 0;
    
    biomassEntries.forEach(entry => {
        const price = parseFloat(entry.querySelector('.biomass-price').value) || 0;
        const mass = parseFloat(entry.querySelector('.biomass-mass').value) || 0;
        const cost = price * mass;
        
        entry.querySelector('.biomass-cost').textContent = cost.toFixed(2);
        totalBiomassCost += cost;
    });
    
    document.getElementById('total-biomass-cost').textContent = totalBiomassCost.toFixed(2);
    return totalBiomassCost;
}

function calculatePrecursorCosts() {
    const chemicalCost = parseFloat(document.getElementById('total-chemical-cost').textContent) || 0;
    const biomassCost = parseFloat(document.getElementById('total-biomass-cost').textContent) || 0;
    const transportCost = parseFloat(document.getElementById('transport-cost').value) || 0;
    
    const totalPrecursor = chemicalCost + biomassCost + transportCost;
    document.getElementById('total-precursor-cost').textContent = totalPrecursor.toFixed(2);
    return totalPrecursor;
}

function calculatePreparationCosts() {
    const numWorkers = parseFloat(document.getElementById('num-workers').value) || 1;
    const prepTime = parseFloat(document.getElementById('prep-time').value) || 0;
    const laborRate = parseFloat(document.getElementById('labor-rate').value) || 151;
    const waterVolume = parseFloat(document.getElementById('water-volume').value) || 0;
    const waterCost = parseFloat(document.getElementById('water-cost').value) || 0;
    
    const laborCost = numWorkers * prepTime * laborRate;
    const totalWaterCost = waterVolume * waterCost;
    const totalPrepCost = laborCost + totalWaterCost;
    
    document.getElementById('labor-cost').textContent = laborCost.toFixed(2);
    document.getElementById('total-water-cost').textContent = totalWaterCost.toFixed(2);
    document.getElementById('total-prep-cost').textContent = totalPrepCost.toFixed(2);
    
    return totalPrepCost;
}

function calculateEnergyCosts() {
    const energyEntries = document.querySelectorAll('.energy-entry');
    let totalEnergyKwh = 0;
    
    energyEntries.forEach(entry => {
        const power = parseFloat(entry.querySelector('.power-rating').value) || 0;
        const time = parseFloat(entry.querySelector('.energy-time').value) || 0;
        const energyKwh = power * time;
        
        entry.querySelector('.energy-kwh').textContent = energyKwh.toFixed(2);
        totalEnergyKwh += energyKwh;
    });
    
    const electricityRate = parseFloat(document.getElementById('electricity-rate').value) || 7;
    const totalEnergyCost = totalEnergyKwh * electricityRate;
    
    document.getElementById('total-energy-kwh').textContent = totalEnergyKwh.toFixed(2);
    document.getElementById('total-energy-cost').textContent = totalEnergyCost.toFixed(2);
    
    return totalEnergyCost;
}

function calculateEquipmentCosts() {
    const equipmentEntries = document.querySelectorAll('.equipment-entry');
    let totalEquipmentCost = 0;
    
    equipmentEntries.forEach(entry => {
        const cost = parseFloat(entry.querySelector('.equipment-cost').value) || 0;
        const lifespan = parseFloat(entry.querySelector('.equipment-lifespan').value) || 10;
        const hoursPerYear = parseFloat(entry.querySelector('.equipment-hours-year').value) || 2000;
        const usage = parseFloat(entry.querySelector('.equipment-usage').value) || 0;
        
        // Depreciation = Cost / (Lifespan × Hours/Year) × Usage
        const depreciation = (cost / (lifespan * hoursPerYear)) * usage;
        
        entry.querySelector('.equipment-depreciation').textContent = depreciation.toFixed(2);
        totalEquipmentCost += depreciation;
    });
    
    document.getElementById('total-equipment-cost').textContent = totalEquipmentCost.toFixed(2);
    return totalEquipmentCost;
}

function calculateFinalCosts() {
    const precursorCost = parseFloat(document.getElementById('total-precursor-cost').textContent) || 0;
    const prepCost = parseFloat(document.getElementById('total-prep-cost').textContent) || 0;
    const energyCost = parseFloat(document.getElementById('total-energy-cost').textContent) || 0;
    const equipmentCost = parseFloat(document.getElementById('total-equipment-cost').textContent) || 0;
    
    // Calculate overhead (% of direct costs)
    const overheadRate = parseFloat(document.getElementById('overhead-rate').value) || 10;
    const directCosts = precursorCost + prepCost + energyCost;
    const overheadCost = (directCosts * overheadRate) / 100;
    document.getElementById('overhead-cost').value = overheadCost.toFixed(2);
    document.getElementById('overhead-percent').textContent = overheadRate;
    
    const miscCost = parseFloat(document.getElementById('misc-cost').value) || 0;
    
    // Calculate grand total
    const grandTotal = precursorCost + prepCost + energyCost + equipmentCost + overheadCost + miscCost;
    
    // Update final breakdown
    document.getElementById('final-precursor').textContent = precursorCost.toFixed(2);
    document.getElementById('final-prep').textContent = prepCost.toFixed(2);
    document.getElementById('final-energy').textContent = energyCost.toFixed(2);
    document.getElementById('final-equipment').textContent = equipmentCost.toFixed(2);
    document.getElementById('final-overhead').textContent = overheadCost.toFixed(2);
    document.getElementById('final-misc').textContent = miscCost.toFixed(2);
    document.getElementById('grand-total').textContent = grandTotal.toFixed(2);
    
    // Calculate actual yield and cost per kg
    const biomassInput = parseFloat(document.getElementById('biomass-input').value) || 1;
    const yieldPercentage = parseFloat(document.getElementById('yield-percentage').value) || 30;
    const actualYield = (biomassInput * yieldPercentage) / 100;
    document.getElementById('adsorbent-yield').value = actualYield.toFixed(3);
    
    const costPerKg = actualYield > 0 ? grandTotal / actualYield : 0;
    document.getElementById('cost-per-kg').textContent = costPerKg.toFixed(2);
}

function exportReport() {
    // Collect all data
    const reportData = {
        date: new Date().toLocaleDateString(),
        chemicals: collectChemicalData(),
        biomass: collectBiomassData(),
        transport: parseFloat(document.getElementById('transport-cost').value) || 0,
        preparation: {
            workers: parseFloat(document.getElementById('num-workers').value) || 1,
            time: parseFloat(document.getElementById('prep-time').value) || 0,
            laborRate: parseFloat(document.getElementById('labor-rate').value) || 151,
            waterVolume: parseFloat(document.getElementById('water-volume').value) || 0,
            waterCost: parseFloat(document.getElementById('water-cost').value) || 0
        },
        energy: collectEnergyData(),
        equipment: collectEquipmentData(),
        costs: {
            precursor: parseFloat(document.getElementById('total-precursor-cost').textContent) || 0,
            preparation: parseFloat(document.getElementById('total-prep-cost').textContent) || 0,
            energy: parseFloat(document.getElementById('total-energy-cost').textContent) || 0,
            equipment: parseFloat(document.getElementById('total-equipment-cost').textContent) || 0,
            overhead: parseFloat(document.getElementById('overhead-cost').value) || 0,
            misc: parseFloat(document.getElementById('misc-cost').value) || 0,
            total: parseFloat(document.getElementById('grand-total').textContent) || 0,
            perKg: parseFloat(document.getElementById('cost-per-kg').textContent) || 0
        }
    };
    
    // Generate text report
    let report = generateTextReport(reportData);
    
    // Download as text file
    downloadReport(report);
    
    alert('Report exported successfully! Check your downloads folder.');
}

function collectChemicalData() {
    const chemicals = [];
    document.querySelectorAll('.chemical-entry').forEach(entry => {
        const name = entry.querySelector('.chem-name').value || 'Unnamed Chemical';
        const avgPrice = parseFloat(entry.querySelector('.avg-price').textContent) || 0;
        const mass = parseFloat(entry.querySelector('.chem-mass').value) || 0;
        const cost = parseFloat(entry.querySelector('.chem-cost').textContent) || 0;
        chemicals.push({ name, avgPrice, mass, cost });
    });
    return chemicals;
}

function collectBiomassData() {
    const biomass = [];
    document.querySelectorAll('.biomass-entry').forEach(entry => {
        const name = entry.querySelector('.biomass-name').value || 'Unnamed Biomass';
        const price = parseFloat(entry.querySelector('.biomass-price').value) || 0;
        const mass = parseFloat(entry.querySelector('.biomass-mass').value) || 0;
        const cost = parseFloat(entry.querySelector('.biomass-cost').textContent) || 0;
        biomass.push({ name, price, mass, cost });
    });
    return biomass;
}

function collectEnergyData() {
    const energy = [];
    document.querySelectorAll('.energy-entry').forEach(entry => {
        const stage = entry.querySelector('.stage-name').value || 'Unnamed Stage';
        const power = parseFloat(entry.querySelector('.power-rating').value) || 0;
        const time = parseFloat(entry.querySelector('.energy-time').value) || 0;
        const kwh = parseFloat(entry.querySelector('.energy-kwh').textContent) || 0;
        energy.push({ stage, power, time, kwh });
    });
    return energy;
}

function collectEquipmentData() {
    const equipment = [];
    document.querySelectorAll('.equipment-entry').forEach(entry => {
        const name = entry.querySelector('.equipment-name').value || 'Unnamed Equipment';
        const cost = parseFloat(entry.querySelector('.equipment-cost').value) || 0;
        const lifespan = parseFloat(entry.querySelector('.equipment-lifespan').value) || 10;
        const hoursPerYear = parseFloat(entry.querySelector('.equipment-hours-year').value) || 2000;
        const usage = parseFloat(entry.querySelector('.equipment-usage').value) || 0;
        const depreciation = parseFloat(entry.querySelector('.equipment-depreciation').textContent) || 0;
        equipment.push({ name, cost, lifespan, hoursPerYear, usage, depreciation });
    });
    return equipment;
}

function generateTextReport(data) {
    let report = `
╔════════════════════════════════════════════════════════════════╗
║     BIOCHAR/ADSORBENT PRODUCTION COST ANALYSIS REPORT         ║
╚════════════════════════════════════════════════════════════════╝

Date: ${data.date}

═══════════════════════════════════════════════════════════════

1. CHEMICAL COSTS (C_Chemicals)
───────────────────────────────────────────────────────────────
`;
    
    data.chemicals.forEach((chem, i) => {
        report += `
Chemical ${i + 1}: ${chem.name}
  Average Price: ₹${chem.avgPrice.toFixed(2)}/kg
  Mass Used: ${chem.mass.toFixed(2)} g
  Cost: ₹${chem.cost.toFixed(2)}
`;
    });
    
    report += `
Total Chemical Cost: ₹${data.costs.precursor.toFixed(2)}

═══════════════════════════════════════════════════════════════

2. BIOMASS COSTS (C_Biomass)
───────────────────────────────────────────────────────────────
`;
    
    data.biomass.forEach((bio, i) => {
        report += `
Biomass ${i + 1}: ${bio.name}
  Price: ₹${bio.price.toFixed(2)}/kg
  Mass Used: ${bio.mass.toFixed(2)} kg
  Cost: ₹${bio.cost.toFixed(2)}
`;
    });
    
    report += `
═══════════════════════════════════════════════════════════════

3. TRANSPORTATION COSTS (C_Transport)
───────────────────────────────────────────────────────────────
Transport Cost: ₹${data.transport.toFixed(2)}

═══════════════════════════════════════════════════════════════

4. PREPARATION COSTS (C_Preparation)
───────────────────────────────────────────────────────────────
Number of Workers: ${data.preparation.workers}
Total Time: ${data.preparation.time} hours
Labor Rate: ₹${data.preparation.laborRate}/hour
Labor Cost: ₹${(data.preparation.workers * data.preparation.time * data.preparation.laborRate).toFixed(2)}

DI Water Used: ${data.preparation.waterVolume} L
Water Cost: ₹${data.preparation.waterCost}/L
Total Water Cost: ₹${(data.preparation.waterVolume * data.preparation.waterCost).toFixed(2)}

Total Preparation Cost: ₹${data.costs.preparation.toFixed(2)}

═══════════════════════════════════════════════════════════════

5. ENERGY COSTS (C_Energy)
───────────────────────────────────────────────────────────────
`;
    
    data.energy.forEach((stage, i) => {
        report += `
Stage ${i + 1}: ${stage.stage}
  Power: ${stage.power} kW
  Time: ${stage.time} hours
  Energy: ${stage.kwh.toFixed(2)} kWh
`;
    });
    
    report += `
Total Energy Cost: ₹${data.costs.energy.toFixed(2)}

═══════════════════════════════════════════════════════════════

6. EQUIPMENT DEPRECIATION (C_Equipment)
───────────────────────────────────────────────────────────────
`;
    
    data.equipment.forEach((equip, i) => {
        report += `
Equipment ${i + 1}: ${equip.name}
  Equipment Cost: ₹${equip.cost.toFixed(2)}
  Lifespan: ${equip.lifespan} years
  Operating Hours/Year: ${equip.hoursPerYear}
  Usage Hours: ${equip.usage} hours
  Depreciation: ₹${equip.depreciation.toFixed(2)}
`;
    });
    
    report += `
Total Equipment Cost: ₹${data.costs.equipment.toFixed(2)}

═══════════════════════════════════════════════════════════════

7. FINAL COST BREAKDOWN
───────────────────────────────────────────────────────────────
C_Precursors:           ₹${data.costs.precursor.toFixed(2)}
C_Preparation:          ₹${data.costs.preparation.toFixed(2)}
C_Energy:               ₹${data.costs.energy.toFixed(2)}
C_Equipment:            ₹${data.costs.equipment.toFixed(2)}
C_Overhead:             ₹${data.costs.overhead.toFixed(2)}
Additional Costs:       ₹${data.costs.misc.toFixed(2)}
───────────────────────────────────────────────────────────────
TOTAL COST:             ₹${data.costs.total.toFixed(2)}

═══════════════════════════════════════════════════════════════

COST PER KILOGRAM:      ₹${data.costs.perKg.toFixed(2)}/kg

═══════════════════════════════════════════════════════════════

Formula Used:
Total Cost = C_Precursors + C_Preparation + C_Energy + C_Equipment + C_Overhead + Additional Cost
C_Overhead = (C_Precursors + C_Preparation + C_Energy) × Overhead Rate

═══════════════════════════════════════════════════════════════
Generated by Biochar Cost Calculator
© 2024 Research Tool
═══════════════════════════════════════════════════════════════
`;
    
    return report;
}

function downloadReport(content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Biochar_Cost_Report_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

function exportExcelReport() {
    const reportData = {
        date: new Date().toLocaleDateString(),
        chemicals: collectChemicalData(),
        biomass: collectBiomassData(),
        transport: parseFloat(document.getElementById('transport-cost').value) || 0,
        preparation: {
            workers: parseFloat(document.getElementById('num-workers').value) || 1,
            time: parseFloat(document.getElementById('prep-time').value) || 0,
            laborRate: parseFloat(document.getElementById('labor-rate').value) || 151,
            waterVolume: parseFloat(document.getElementById('water-volume').value) || 0,
            waterCost: parseFloat(document.getElementById('water-cost').value) || 0
        },
        energy: collectEnergyData(),
        equipment: collectEquipmentData(),
        costs: {
            precursor: parseFloat(document.getElementById('total-precursor-cost').textContent) || 0,
            preparation: parseFloat(document.getElementById('total-prep-cost').textContent) || 0,
            energy: parseFloat(document.getElementById('total-energy-cost').textContent) || 0,
            equipment: parseFloat(document.getElementById('total-equipment-cost').textContent) || 0,
            overhead: parseFloat(document.getElementById('overhead-cost').value) || 0,
            misc: parseFloat(document.getElementById('misc-cost').value) || 0,
            total: parseFloat(document.getElementById('grand-total').textContent) || 0,
            perKg: parseFloat(document.getElementById('cost-per-kg').textContent) || 0
        },
        biomassInput: parseFloat(document.getElementById('biomass-input').value) || 1,
        yieldPercentage: parseFloat(document.getElementById('yield-percentage').value) || 30,
        actualYield: parseFloat(document.getElementById('adsorbent-yield').value) || 0
    };
    
    let csv = generateCSVReport(reportData);
    downloadCSV(csv);
    alert('Excel report exported successfully! Check your downloads folder.');
}

function generateCSVReport(data) {
    let csv = 'BIOCHAR/ADSORBENT PRODUCTION COST ANALYSIS REPORT\n';
    csv += `Date:,${data.date}\n\n`;
    
    // Chemicals Section
    csv += '1. CHEMICAL COSTS (C_Chemicals)\n';
    csv += 'Chemical Name,Average Price (Rs./kg),Mass Used (g),Cost (Rs.)\n';
    data.chemicals.forEach(chem => {
        csv += `${chem.name},${chem.avgPrice.toFixed(2)},${chem.mass.toFixed(2)},${chem.cost.toFixed(2)}\n`;
    });
    csv += `Total Chemical Cost:,,,Rs.${data.costs.precursor.toFixed(2)}\n\n`;
    
    // Biomass Section
    csv += '2. BIOMASS COSTS (C_Biomass)\n';
    csv += 'Biomass Name,Price (Rs./kg),Mass Used (kg),Cost (Rs.)\n';
    data.biomass.forEach(bio => {
        csv += `${bio.name},${bio.price.toFixed(2)},${bio.mass.toFixed(2)},${bio.cost.toFixed(2)}\n`;
    });
    csv += '\n';
    
    // Transportation
    csv += '3. TRANSPORTATION COSTS (C_Transport)\n';
    csv += `Transport Cost:,Rs.${data.transport.toFixed(2)}\n\n`;
    
    // Preparation
    csv += '4. PREPARATION COSTS (C_Preparation)\n';
    csv += 'Parameter,Value\n';
    csv += `Number of Workers,${data.preparation.workers}\n`;
    csv += `Total Time (hours),${data.preparation.time}\n`;
    csv += `Labor Rate (Rs./hour),${data.preparation.laborRate}\n`;
    csv += `Labor Cost,Rs.${(data.preparation.workers * data.preparation.time * data.preparation.laborRate).toFixed(2)}\n`;
    csv += `DI Water Used (L),${data.preparation.waterVolume}\n`;
    csv += `Water Cost (Rs./L),${data.preparation.waterCost}\n`;
    csv += `Total Water Cost,Rs.${(data.preparation.waterVolume * data.preparation.waterCost).toFixed(2)}\n`;
    csv += `Total Preparation Cost,Rs.${data.costs.preparation.toFixed(2)}\n\n`;
    
    // Energy
    csv += '5. ENERGY COSTS (C_Energy)\n';
    csv += 'Stage Name,Power (kW),Time (hours),Energy (kWh)\n';
    data.energy.forEach(stage => {
        csv += `${stage.stage},${stage.power},${stage.time},${stage.kwh.toFixed(2)}\n`;
    });
    csv += `Total Energy Cost:,,,Rs.${data.costs.energy.toFixed(2)}\n\n`;
    
    // Equipment
    csv += '6. EQUIPMENT DEPRECIATION (C_Equipment)\n';
    csv += 'Equipment Name,Cost (Rs.),Lifespan (years),Hours/Year,Usage Hours,Depreciation (Rs.)\n';
    data.equipment.forEach(equip => {
        csv += `${equip.name},${equip.cost.toFixed(2)},${equip.lifespan},${equip.hoursPerYear},${equip.usage},${equip.depreciation.toFixed(2)}\n`;
    });
    csv += `Total Equipment Cost:,,,,,Rs.${data.costs.equipment.toFixed(2)}\n\n`;
    
    // Final Cost Breakdown
    csv += '7. FINAL COST BREAKDOWN\n';
    csv += 'Cost Component,Amount (Rs.)\n';
    csv += `C_Precursors,${data.costs.precursor.toFixed(2)}\n`;
    csv += `C_Preparation,${data.costs.preparation.toFixed(2)}\n`;
    csv += `C_Energy,${data.costs.energy.toFixed(2)}\n`;
    csv += `C_Equipment,${data.costs.equipment.toFixed(2)}\n`;
    csv += `C_Overhead,${data.costs.overhead.toFixed(2)}\n`;
    csv += `Additional Costs,${data.costs.misc.toFixed(2)}\n`;
    csv += `TOTAL COST,${data.costs.total.toFixed(2)}\n\n`;
    
    // Yield and Cost per kg
    csv += '8. YIELD AND COST PER KILOGRAM\n';
    csv += 'Parameter,Value\n';
    csv += `Biomass Input (kg),${data.biomassInput}\n`;
    csv += `Yield Percentage (%),${data.yieldPercentage}\n`;
    csv += `Actual Yield (kg),${data.actualYield}\n`;
    csv += `COST PER KILOGRAM,Rs.${data.costs.perKg.toFixed(2)}/kg\n\n`;
    
    csv += 'Formula Used:\n';
    csv += 'Total Cost = C_Precursors + C_Preparation + C_Energy + C_Equipment + C_Overhead + Additional Cost\n';
    csv += 'C_Overhead = (C_Precursors + C_Preparation + C_Energy) x Overhead Rate\n';
    csv += 'Cost per kg = Total_Cost / (Biomass_Input x Yield_%)\n';
    
    return csv;
}

function downloadCSV(content) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Biochar_Cost_Report_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

function saveMaterial() {
    const materialName = prompt('Enter material name (e.g., TTS-H2SO4, Rice Husk-KOH):');
    if (!materialName) return;
    
    const materialData = {
        name: materialName,
        date: new Date().toLocaleDateString(),
        chemicals: collectChemicalData(),
        biomass: collectBiomassData(),
        transport: parseFloat(document.getElementById('transport-cost').value) || 0,
        preparation: {
            workers: parseFloat(document.getElementById('num-workers').value) || 1,
            time: parseFloat(document.getElementById('prep-time').value) || 0,
            laborRate: parseFloat(document.getElementById('labor-rate').value) || 151,
            waterVolume: parseFloat(document.getElementById('water-volume').value) || 0,
            waterCost: parseFloat(document.getElementById('water-cost').value) || 0
        },
        energy: collectEnergyData(),
        equipment: collectEquipmentData(),
        costs: {
            precursor: parseFloat(document.getElementById('total-precursor-cost').textContent) || 0,
            preparation: parseFloat(document.getElementById('total-prep-cost').textContent) || 0,
            energy: parseFloat(document.getElementById('total-energy-cost').textContent) || 0,
            equipment: parseFloat(document.getElementById('total-equipment-cost').textContent) || 0,
            overhead: parseFloat(document.getElementById('overhead-cost').value) || 0,
            misc: parseFloat(document.getElementById('misc-cost').value) || 0,
            total: parseFloat(document.getElementById('grand-total').textContent) || 0,
            perKg: parseFloat(document.getElementById('cost-per-kg').textContent) || 0
        },
        biomassInput: parseFloat(document.getElementById('biomass-input').value) || 1,
        yieldPercentage: parseFloat(document.getElementById('yield-percentage').value) || 30,
        actualYield: parseFloat(document.getElementById('adsorbent-yield').value) || 0
    };
    
    savedMaterials.push(materialData);
    updateSavedMaterialsList();
    alert(`Material "${materialName}" saved! Total saved: ${savedMaterials.length}`);
}

function updateSavedMaterialsList() {
    const listContainer = document.getElementById('saved-materials-list');
    document.getElementById('saved-count').textContent = savedMaterials.length;
    
    if (savedMaterials.length === 0) {
        listContainer.innerHTML = '<p style="color: #999;">No materials saved yet</p>';
        return;
    }
    
    let html = '<ul style="list-style: none; padding: 0;">';
    savedMaterials.forEach((mat, index) => {
        html += `
            <li style="background: white; padding: 10px; margin: 5px 0; border-radius: 5px; display: flex; justify-content: space-between; align-items: center;">
                <span><strong>${index + 1}. ${mat.name}</strong> - Rs.${mat.costs.perKg.toFixed(2)}/kg</span>
                <button onclick="removeMaterial(${index})" style="background: #ff4444; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Remove</button>
            </li>
        `;
    });
    html += '</ul>';
    listContainer.innerHTML = html;
}

function removeMaterial(index) {
    savedMaterials.splice(index, 1);
    updateSavedMaterialsList();
}

function exportAllMaterials() {
    if (savedMaterials.length === 0) {
        alert('No materials saved! Please save at least one material calculation first.');
        return;
    }
    
    let csv = 'COMPARATIVE COST ANALYSIS - MULTIPLE MATERIALS\n';
    csv += `Generated: ${new Date().toLocaleDateString()}\n\n`;
    
    // Summary Table
    csv += 'SUMMARY - COST COMPARISON\n';
    csv += 'Material Name,Total Cost (Rs.),Biomass Input (kg),Yield (%),Actual Yield (kg),Cost per kg (Rs./kg)\n';
    savedMaterials.forEach(mat => {
        csv += `${mat.name},${mat.costs.total.toFixed(2)},${mat.biomassInput},${mat.yieldPercentage},${mat.actualYield},${mat.costs.perKg.toFixed(2)}\n`;
    });
    csv += '\n\n';
    
    // Detailed breakdown for each material
    savedMaterials.forEach((mat, index) => {
        csv += `\n${'='.repeat(80)}\n`;
        csv += `MATERIAL ${index + 1}: ${mat.name}\n`;
        csv += `${'='.repeat(80)}\n\n`;
        
        // Cost breakdown
        csv += 'COST BREAKDOWN\n';
        csv += 'Component,Amount (Rs.)\n';
        csv += `Precursors,${mat.costs.precursor.toFixed(2)}\n`;
        csv += `Preparation,${mat.costs.preparation.toFixed(2)}\n`;
        csv += `Energy,${mat.costs.energy.toFixed(2)}\n`;
        csv += `Equipment,${mat.costs.equipment.toFixed(2)}\n`;
        csv += `Overhead,${mat.costs.overhead.toFixed(2)}\n`;
        csv += `Miscellaneous,${mat.costs.misc.toFixed(2)}\n`;
        csv += `TOTAL,${mat.costs.total.toFixed(2)}\n\n`;
        
        // Chemicals
        if (mat.chemicals.length > 0) {
            csv += 'CHEMICALS USED\n';
            csv += 'Chemical Name,Avg Price (Rs./kg),Mass (g),Cost (Rs.)\n';
            mat.chemicals.forEach(chem => {
                csv += `${chem.name},${chem.avgPrice.toFixed(2)},${chem.mass.toFixed(2)},${chem.cost.toFixed(2)}\n`;
            });
            csv += '\n';
        }
        
        // Energy stages
        if (mat.energy.length > 0) {
            csv += 'ENERGY CONSUMPTION\n';
            csv += 'Stage,Power (kW),Time (hrs),Energy (kWh)\n';
            mat.energy.forEach(stage => {
                csv += `${stage.stage},${stage.power},${stage.time},${stage.kwh.toFixed(2)}\n`;
            });
            csv += '\n';
        }
        
        csv += '\n';
    });
    
    // Download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Comparative_Cost_Analysis_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    alert(`Comparative report exported with ${savedMaterials.length} materials!`);
}

// Initialize on load
calculateAll();
