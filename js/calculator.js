export function initCalculator() {
    const calculatorForm = document.getElementById('badsanierung-rechner');
    if (!calculatorForm) return;

    const groesseSlider = document.getElementById('groesse');
    const groesseWert = document.getElementById('groesse-wert');
    const kostenDisplay = document.getElementById('geschaetzte-kosten');

    const PREISE = {
        grundpauschale: 1500, // For planning, demolition, etc.
        pro_m2: 800,
        sanierung: {
            dusche: 2500,
            badewanne: 2000,
            fliesen: 0, // Included in m2 price
            wc: 800,
            waschtisch: 1200,
            heizkoerper: 700
        },
        qualitaet_faktor: {
            standard: 1.0,
            premium: 1.5,
            luxus: 2.2
        }
    };

    function berechneKosten() {
        const formData = new FormData(calculatorForm);
        const groesse = parseFloat(formData.get('groesse'));
        const qualitaet = formData.get('qualitaet');
        const sanierungsOptionen = formData.getAll('sanierung');

        let basisKosten = PREISE.grundpauschale + (groesse * PREISE.pro_m2);

        let optionenKosten = 0;
        sanierungsOptionen.forEach(option => {
            optionenKosten += PREISE.sanierung[option] || 0;
        });

        let total = basisKosten + optionenKosten;
        total *= PREISE.qualitaet_faktor[qualitaet];

        // Animate the price update
        let currentCost = parseFloat(kostenDisplay.textContent.replace(/[€\s.]/g, '').replace(',', '.')) || 0;
        let start = currentCost;
        let end = total;
        let duration = 500;
        let startTime = null;

        function animate(currentTime) {
            if (startTime === null) startTime = currentTime;
            let elapsedTime = currentTime - startTime;
            let progress = Math.min(elapsedTime / duration, 1);
            let value = start + (end - start) * progress;
            kostenDisplay.textContent = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        requestAnimationFrame(animate);

        // Update size display
        if (groesseSlider && groesseWert) {
            groesseWert.textContent = `${groesse} m²`;
        }
    }

    calculatorForm.addEventListener('input', berechneKosten);

    // Initial calculation
    berechneKosten();
}
