# Biochar/Adsorbent Production Cost Calculator

## 📋 Overview

A comprehensive web-based calculator for techno-economic analysis of biochar and adsorbent production. This tool implements the complete cost calculation framework based on the research methodology for Tribulus terrestris-derived carbon materials.

## 🎯 Features

### 1. **Chemical Cost Calculation (C_Chemicals)**
- Add multiple chemicals with 5-supplier price averaging
- Automatic average price calculation
- Mass-based cost computation
- Real-time cost updates

### 2. **Biomass Cost Calculation (C_Biomass)**
- Multiple biomass input support
- Zero-cost option for agricultural waste
- Price per kilogram calculation
- Total biomass cost aggregation

### 3. **Transportation Cost (C_Transport)**
- Optional transportation cost input
- Can be set to zero if included in chemical prices

### 4. **Preparation Cost (C_Preparation)**
- Labor cost calculation based on:
  - Number of workers
  - Total time (hours)
  - Labor rate (₹/hour) - Default: ₹151/hour (India average)
- DI water consumption cost
- Automatic total preparation cost

### 5. **Energy Cost (C_Energy)**
- Multiple energy stage support
- Power (kW) × Time (hours) calculation
- Electricity rate customization
- Total energy consumption in kWh
- Automatic cost calculation

### 6. **Additional Costs**
- 10% offset cost (auto-calculated)
- Miscellaneous costs input
- Comprehensive cost breakdown

### 7. **Final Analysis**
- Complete cost breakdown table
- Cost per kilogram calculation
- Export functionality (text report)
- Real-time recalculation

## 📐 Formula Implementation

```
Total Cost = C_Precursors + C_Preparation + C_Energy + 10% Offset + Additional Cost

Where:
- C_Precursors = C_Chemicals + C_Biomass + C_Transport
- C_Chemicals = Σ[(Average Price/1000) × Mass Used]
- C_Biomass = Σ[Price × Mass]
- C_Preparation = (Workers × Time × Labor Rate) + Water Cost
- C_Energy = Σ(Power × Time) × Electricity Rate
```

## 🚀 How to Use

### Step 1: Open the Calculator
1. Navigate to the WebApp folder
2. Open `index.html` in any modern web browser
3. No installation or server required!

### Step 2: Enter Chemical Data
1. Enter chemical name (e.g., H₂SO₄, Na₂CO₃)
2. Input prices from 5 different suppliers
3. Enter mass used in grams
4. Average price and cost calculated automatically
5. Click "+ Add Another Chemical" for more chemicals

### Step 3: Enter Biomass Data
1. Enter biomass name (e.g., TTS seeds)
2. Input price per kg (0 for waste)
3. Enter mass used in kg
4. Click "+ Add Another Biomass" if needed

### Step 4: Transportation Cost
- Enter transportation cost (₹)
- Set to 0 if included in chemical prices

### Step 5: Preparation Details
1. Number of workers
2. Total preparation time (hours)
3. Labor rate (₹/hour)
4. DI water volume (L)
5. DI water cost (₹/L)

### Step 6: Energy Consumption
1. Enter stage name (e.g., "Drying at 100°C")
2. Power rating (kW) - check furnace manual
3. Time duration (hours)
4. Click "+ Add Another Energy Stage" for multiple stages
5. Enter electricity rate (₹/kWh)

### Step 7: Additional Costs
- 10% offset calculated automatically
- Enter any miscellaneous costs

### Step 8: Final Calculation
1. Enter adsorbent yield (kg)
2. Click "🔄 Recalculate All"
3. View cost per kilogram
4. Click "📥 Export Report" to download

## 📊 Example Calculation

### TTS-CB1 Biochar Production

**Chemicals:**
- H₂SO₄: 8 mL (₹50/kg avg) = ₹0.40
- Na₂CO₃: 10 g (₹30/kg avg) = ₹0.30
Total: ₹0.70

**Biomass:**
- TTS seeds: 20 g @ ₹0/kg = ₹0.00

**Preparation:**
- 1 worker × 8 hours × ₹151/hour = ₹1,208
- 10 L water × ₹2/L = ₹20
Total: ₹1,228

**Energy:**
- Drying (100°C): 2 kW × 8 h = 16 kWh
- Carbonization (800°C): 5 kW × 4 h = 20 kWh
- Total: 36 kWh × ₹7/kWh = ₹252

**Final Cost:**
- Precursors: ₹0.70
- Preparation: ₹1,228
- Energy: ₹252
- 10% Offset: ₹148.07
- Total: ₹1,628.77

**Cost per kg:** ₹1,628.77/kg (for 1 kg yield)

## 🎨 Features

### Real-time Calculation
- All costs update automatically as you type
- No need to click calculate for each change

### Dynamic Entry Addition
- Add unlimited chemicals, biomass, and energy stages
- Remove entries not needed

### Professional Export
- Generates detailed text report
- Includes all input parameters
- Shows complete cost breakdown
- Downloadable for documentation

### Responsive Design
- Works on desktop, tablet, and mobile
- Professional gradient design
- Easy-to-read layout

## 🔧 Technical Details

### Files Structure
```
WebApp/
├── index.html          # Main HTML structure
├── styles.css          # Professional styling
├── calculator.js       # Calculation logic
└── README.md          # This file
```

### Technologies Used
- HTML5
- CSS3 (Gradients, Flexbox, Grid)
- Vanilla JavaScript (ES6+)
- No external dependencies

### Browser Compatibility
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## 📈 Cost Comparison

Based on literature and this study:

| Material | Cost (₹/kg) | Source |
|----------|-------------|--------|
| Commercial Activated Carbon | 2,000-10,000 | Market |
| TTS-Biochar (This study) | ~395 | Calculated |
| Other Biochars | 500-2,000 | Literature |

## 🔬 Research Application

This calculator is designed for:
- Research cost analysis
- Techno-economic feasibility studies
- Comparative cost assessment
- Scale-up cost estimation
- Publication-ready cost data

## 📝 Citation

If you use this calculator in your research, please cite:

```
Tribulus terrestris-Derived Biochar Cost Calculator
Developed for comprehensive techno-economic analysis
Based on systematic cost calculation framework
2024
```

## 🤝 Support

For issues or questions:
1. Check all input fields are filled correctly
2. Ensure numerical values are positive
3. Verify electricity and labor rates for your region
4. Export report for detailed breakdown

## 📄 License

This tool is provided for research and educational purposes.

## 🔄 Updates

**Version 1.0** (2024)
- Initial release
- Complete formula implementation
- Export functionality
- Real-time calculation

## 💡 Tips

1. **Accurate Pricing**: Get quotes from 5 suppliers for best accuracy
2. **Regional Rates**: Adjust labor and electricity rates for your location
3. **Yield Estimation**: Use actual experimental yield for accurate cost/kg
4. **Documentation**: Export reports for each batch for comparison
5. **Scale-up**: Multiply by production volume for industrial estimates

## 🎯 Future Enhancements

- PDF export with charts
- Cost comparison graphs
- Database for saving calculations
- Multi-currency support
- Batch calculation mode
- Machine learning cost prediction

---

**Developed for sustainable biochar production research**
**© 2024 Biochar Cost Calculator**
