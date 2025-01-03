function teoDivEntera() {
    const a = document.getElementById('num1').value;
    const b = document.getElementById('num2').value;
  
    if (a === '' || b === '') {
      document.getElementById('q').innerHTML = 'q = ';
      document.getElementById('r').innerHTML = 'r = ';
      return;
    }
  
    if (b === '0') {
      document.getElementById('q').innerHTML = 'q = undefined (división por cero)';
      document.getElementById('r').innerHTML = 'r = undefined (división por cero)';
      return;
    }
  
    const q = Math.floor(a / b);
    const r = a % b;
  
    document.getElementById('q').innerHTML = `q = ${q}`;
    document.getElementById('r').innerHTML = `r = ${r}`;
  }
  
  function clearDivisionEntera() {
    document.getElementById('q').innerHTML = 'q = ';
    document.getElementById('r').innerHTML = 'r = ';
    document.getElementById('num1').value = '';
    document.getElementById('num2').value = '';
  }
  
  function calculateGCD() {
    const a = document.getElementById('gcdNum1').value;
    const b = document.getElementById('gcdNum2').value;
  
    if (a === '' || b === '') {
      document.getElementById('mcd').innerHTML = 'mcd = ';
      return;
    }
  
    if (a === '0' && b === '0') {
      document.getElementById('mcd').innerHTML = 'mcd = 0';
      return;
    }
  
    const gcd = euclideanGCD(Math.abs(a), Math.abs(b));
  
    document.getElementById('mcd').innerHTML = `mcd = ${gcd}`;
  }
  
  function euclideanGCD(a, b) {
    if (b === 0) {
      return a;
    }
    return euclideanGCD(b, a % b);
  }
  
  function clearGCD() {
    document.getElementById('mcd').innerHTML = 'mcd = ';
    document.getElementById('gcdNum1').value = '';
    document.getElementById('gcdNum2').value = '';
  }
  
  function calculateGCDAndBezout() {
    const a = document.getElementById('bezoutNum1').value;
    const b = document.getElementById('bezoutNum2').value;
  
    if (a === '' || b === '') {
      document.getElementById('bezoutMcd').innerHTML = 'mcd = ';
      document.getElementById('bezoutCoeffs').innerHTML = 'Coeficientes de Bézout: x<sub>0</sub> = , y<sub>0</sub> = ';
      return;
    }
  
    if (a === '0' && b === '0') {
      document.getElementById('bezoutMcd').innerHTML = 'mcd = 0';
      document.getElementById('bezoutCoeffs').innerHTML = 'Coeficientes de Bézout: x<sub>0</sub> = , y<sub>0</sub> = ';
      return;
    }
  
    const [gcd, x0, y0] = extendedEuclideanGCD(Math.abs(a), Math.abs(b));
  
    document.getElementById('bezoutMcd').innerHTML = `mcd = ${gcd}`;
    document.getElementById('bezoutCoeffs').innerHTML = `Coeficientes de Bézout: x<sub>0</sub> = ${x0}, y<sub>0</sub> = ${y0}`;
  }
  
  function extendedEuclideanGCD(a, b) {
    if (b === 0) {
      return [a, 1, 0];
    }
  
    const [gcd, x1, y1] = extendedEuclideanGCD(b, a % b);
    const x0 = y1;
    const y0 = x1 - Math.floor(a / b) * y1;
  
    return [gcd, x0, y0];
  }
  
  function clearBezout() {
    document.getElementById('bezoutMcd').innerHTML = 'mcd = ';
    document.getElementById('bezoutCoeffs').innerHTML = 'Coeficientes de Bézout: x<sub>0</sub> = , y<sub>0</sub> = ';
    document.getElementById('bezoutNum1').value = '';
    document.getElementById('bezoutNum2').value = '';
  }

  function displayPrimesFromFile() {
  const numPrimes = document.getElementById('numPrimes').value;

  if (numPrimes === '') {
    document.getElementById('primesFromFileOutput').innerHTML = '';
    return;
  }

  fetch('./assets/prime.txt')
    .then(response => response.text())
    .then(data => {
      const primes = data.split(",");
      let output = '';
      for (let i = 0; i < numPrimes && i < primes.length; i++) {
        output += `p<sub>${i + 1}</sub> = ${primes[i]}, `;
      }
      document.getElementById('primesFromFileOutput').innerHTML = output.slice(0, -2);
    })
    .catch(error => {
      console.error('Error al cargar el archivo primes.txt:', error);
      document.getElementById('primesFromFileOutput').innerHTML = 'Error al cargar el archivo primes.txt.';
    });
}
  
  function clearPrimeFromFile() {
    document.getElementById('primesFromFileOutput').innerHTML = '';
    document.getElementById('numPrimes').value = '';
  }
  
  function primeFactorization() {
    const number = document.getElementById('numberToFactorize').value;
  
    if (number === '' || number > 1000000000) {
      document.getElementById('primeFactorizationOutput').innerHTML = 'Descomposición de <span id="factorizedNumber"></span> en factores primos: ';
      return;
    }

    const factorization = getPrimeFactorization(parseInt(number));
    let output = 'Descomposición de <span id="factorizedNumber">' + number + '</span> en factores primos: ';
  
    for (const prime in factorization) {
      const exponent = factorization[prime];
      output += `${prime}<sup>${exponent}</sup> `;
    }
  
    document.getElementById('primeFactorizationOutput').innerHTML = output;
  }
  
  function getPrimeFactorization(number) {
    const factorization = {};
    let n = number;
  
    for (let i = 2; n > 1; i++) {
      let exponent = 0;
      while (n % i === 0) {
        exponent++;
        n /= i;
      }
      if (exponent > 0) {
        factorization[i] = exponent;
      }
    }
  
    return factorization;
  }
  
  function clearPrimeFactorization() {
    document.getElementById('primeFactorizationOutput').innerHTML = 'Descomposición de <span id="factorizedNumber"></span> en factores primos: ';
    document.getElementById('numberToFactorize').value = '';
  }

  function generateZnTable() {
    const n = parseInt(document.getElementById('znNumber').value);
    
    if (!n || n <= 0) {
      document.getElementById('znTableOutput').innerHTML = '';
      return;
    }
  
    let tableHTML = `
      <table border="1" style="margin: 20px auto; border-collapse: collapse;">
        <tr>
          <th style="padding: 8px;">Elemento</th>
          <th style="padding: 8px;">Orden</th>
        </tr>
    `;
  
    for (let i = 0; i < n; i++) {
      const order = calculateOrder(i, n);
      tableHTML += `
        <tr>
          <td style="padding: 8px;">${i}</td>
          <td style="padding: 8px;">${order}</td>
        </tr>
      `;
    }
  
    tableHTML += '</table>';
    document.getElementById('znTableOutput').innerHTML = tableHTML;
  }
  
  function calculateOrder(element, n) {
    if (element === 0) {
      return 1;
    }
    
    let order = 1;
    let currentSum = element;
    
    while (currentSum !== 0) {
      currentSum = (currentSum + element) % n;
      order++;
    }
    
    return order;
  }
  
  function clearZnTable() {
    document.getElementById('znTableOutput').innerHTML = '';
    document.getElementById('znNumber').value = '';
  }

  function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
  }
  
  function generateUnTable() {
    const n = parseInt(document.getElementById('unNumber').value);
    
    if (!n || n <= 0) {
      document.getElementById('unTableOutput').innerHTML = '';
      return;
    }
  
    let elements = [];
    for (let i = 1; i < n; i++) {
      if (gcd(i, n) === 1) {
        elements.push(i);
      }
    }
  
    let tableHTML = `
      <table border="1" style="margin: 20px auto; border-collapse: collapse;">
        <tr>
          <th style="padding: 8px;">Elemento</th>
          <th style="padding: 8px;">Orden</th>
        </tr>
    `;
  
    elements.forEach(element => {
      const order = calculateMultiplicativeOrder(element, n);
      tableHTML += `
        <tr>
          <td style="padding: 8px;">${element}</td>
          <td style="padding: 8px;">${order}</td>
        </tr>
      `;
    });
  
    tableHTML += '</table>';
    document.getElementById('unTableOutput').innerHTML = tableHTML;
  }
  
  function calculateMultiplicativeOrder(element, n) {
    let order = 1;
    let current = element;
    
    while (current !== 1) {
      current = (current * element) % n;
      order++;
      if (order > n) break;
    }
    
    return order;
  }
  
  function generateDnTable() {
    const n = parseInt(document.getElementById('dnNumber').value);
    
    if (!n || n < 3) {
      document.getElementById('dnTableOutput').innerHTML = '';
      return;
    }
  
    let tableHTML = `
      <table border="1" style="margin: 20px auto; border-collapse: collapse;">
        <tr>
          <th style="padding: 8px;">Elemento</th>
          <th style="padding: 8px;">Orden</th>
          <th style="padding: 8px;">Tipo</th>
        </tr>
    `;
  
    for (let i = 0; i < n; i++) {
      const order = n / gcd(i, n);
      tableHTML += `
        <tr>
          <td style="padding: 8px;">r<sup>${i}</sup></td>
          <td style="padding: 8px;">${order}</td>
          <td style="padding: 8px;">Rotación</td>
        </tr>
      `;
    }
  
    for (let i = 0; i < n; i++) {
      tableHTML += `
        <tr>
          <td style="padding: 8px;">s${i}</td>
          <td style="padding: 8px;">2</td>
          <td style="padding: 8px;">Reflexión</td>
        </tr>
      `;
    }
  
    tableHTML += '</table>';
    document.getElementById('dnTableOutput').innerHTML = tableHTML;
  
    let propertiesHTML = `
      <div style="margin-top: 20px; text-align: left; max-width: 600px; margin-left: auto; margin-right: auto;">
        <p><strong>Propiedades del grupo D<sub>${n}</sub>:</strong></p>
        <p>• Orden del grupo: ${2*n}</p>
        <p>• Generadores: r, s (donde r<sup>${n}</sup> = 1, s<sup>2</sup> = 1, srs = r<sup>-1</sup>)</p>
        <p>• Estructura: Grupo no abeliano cuando n > 2</p>
        <p>• Subgrupos cíclicos: ⟨r⟩ de orden ${n}, ⟨s⟩ de orden 2</p>
      </div>
    `;
  
    document.getElementById('dnTableOutput').innerHTML += propertiesHTML;
  }
  
  function clearUnTable() {
    document.getElementById('unTableOutput').innerHTML = '';
    document.getElementById('unNumber').value = '';
  }
  
  function clearDnTable() {
    document.getElementById('dnTableOutput').innerHTML = '';
    document.getElementById('dnNumber').value = '';
  }

  function calculateEulerPhi() {
    const n = parseInt(document.getElementById('eulerNumber').value);
    
    if (!n || n <= 0) {
      document.getElementById('inputNumber').innerHTML = '';
      document.getElementById('eulerOutput').innerHTML = '';
      return;
    }
  
    document.getElementById('inputNumber').innerHTML = n;
    
    const factorization = getPrimeFactorization(n);
    const phi = calculatePhiFromFactors(factorization);
    
    document.getElementById('eulerOutput').innerHTML = phi;
  }
  
  function calculatePhiFromFactors(factorization) {
    let result = 1;
    
    for (const prime in factorization) {
      const p = parseInt(prime);
      const exp = factorization[prime];
      result *= Math.pow(p, exp) - Math.pow(p, exp-1);
    }
    
    return result;
  }
  
  function clearEulerPhi() {
    document.getElementById('eulerNumber').value = '';
    document.getElementById('inputNumber').innerHTML = '';
    document.getElementById('eulerOutput').innerHTML = '';
  }

  function updateMathDisplay() {
    const a = document.getElementById('base').value || 'a';
    const b = document.getElementById('exponent').value || 'b';
    const n = document.getElementById('modulus').value || 'n';
    
    document.getElementById('mathDisplay').innerHTML = `\\[${a}^{${b}} \\bmod ${n}\\]`;
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "mathDisplay"]);
}

function modExp(base, exponent, modulus) {
    if (modulus === 1) return 0;
    
    let result = 1;
    base = base % modulus;
    
    while (exponent > 0) {
        if (exponent % 2 === 1) {
            result = (result * base) % modulus;
        }
        base = (base * base) % modulus;
        exponent = Math.floor(exponent / 2);
    }
    return result;
}

function calculateModExp() {
    const base = parseInt(document.getElementById('base').value);
    const exponent = parseInt(document.getElementById('exponent').value);
    const modulus = parseInt(document.getElementById('modulus').value);
    
    if (!base || !exponent || !modulus || modulus <= 0 || exponent < 0) {
        document.getElementById('modExpResult').innerHTML = 'Por favor ingrese valores válidos';
        return;
    }
    
    const result = modExp(base, exponent, modulus);
    document.getElementById('modExpResult').innerHTML = `\\[${base}^{${exponent}} \\equiv ${result} \\pmod{${modulus}}\\]`;
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "modExpResult"]);
}

function clearModExp() {
    document.getElementById('base').value = '';
    document.getElementById('exponent').value = '';
    document.getElementById('modulus').value = '';
    document.getElementById('modExpResult').innerHTML = '';
    updateMathDisplay();
}

function updateInvMathDisplay() {
  const a = document.getElementById('invBase').value || 'a';
  const n = document.getElementById('invModulus').value || 'n';
  
  document.getElementById('invMathDisplay').innerHTML = `\\[${a}x \\equiv 1 \\pmod{${n}}\\]`;
  MathJax.Hub.Queue(["Typeset", MathJax.Hub, "invMathDisplay"]);
}

function modInverse(a, n) {
  const [gcd, x] = extendedEuclidean(a, n);
  
  if (gcd !== 1) {
      return null; // No existe el inverso
  }
  
  return ((x % n) + n) % n;
}

function extendedEuclidean(a, b) {
  if (b === 0) {
      return [a, 1, 0];
  }

  const [gcd, x1, y1] = extendedEuclidean(b, a % b);
  const x = y1;
  const y = x1 - Math.floor(a / b) * y1;

  return [gcd, x, y];
}

function calculateModInv() {
  const base = parseInt(document.getElementById('invBase').value);
  const modulus = parseInt(document.getElementById('invModulus').value);
  
  if (!base || !modulus || modulus <= 0) {
      document.getElementById('modInvResult').innerHTML = 'Por favor ingrese valores válidos';
      return;
  }
  
  const inverse = modInverse(base, modulus);
  
  if (inverse === null) {
      document.getElementById('modInvResult').innerHTML = `\\[\\text{La ecuación }${base}x \\equiv 1 \\pmod{${modulus}}\\text{ no tiene solución}\\]`;
  } else {
      document.getElementById('modInvResult').innerHTML = `\\[${base} \\cdot ${inverse} \\equiv 1 \\pmod{${modulus}}\\]`;
  }
  
  MathJax.Hub.Queue(["Typeset", MathJax.Hub, "modInvResult"]);
}

function clearModInv() {
  document.getElementById('invBase').value = '';
  document.getElementById('invModulus').value = '';
  document.getElementById('modInvResult').innerHTML = '';
  updateInvMathDisplay();
}

function crtTwoCongruences(a, m1, b, m2) {
  // Check if moduli are coprime
  const gcdResult = extendedEuclideanGCD(m1, m2);
  if (gcdResult[0] !== 1) {
      return null; // Moduli must be coprime
  }
  
  // Calculate Bézout coefficients
  const bezoutCoeffs = extendedEuclideanGCD(m1, m2);
  const x1 = bezoutCoeffs[1];
  const y1 = bezoutCoeffs[2];
  
  // Calculate solution
  const M = m1 * m2;
  const solution = ((a * m2 * y1 + b * m1 * x1) % M + M) % M;
  
  return solution;
}

function updateCRTDisplay() {
  const a = document.getElementById('crtA').value || 'a';
  const m1 = document.getElementById('crtM1').value || 'm_1';
  const b = document.getElementById('crtB').value || 'b';
  const m2 = document.getElementById('crtM2').value || 'm_2';
  
  document.getElementById('crtMathDisplay').innerHTML = `\\[\\begin{cases} 
      x \\equiv ${a} \\pmod{${m1}} \\\\
      x \\equiv ${b} \\pmod{${m2}}
      \\end{cases}\\]`;
  MathJax.Hub.Queue(["Typeset", MathJax.Hub, "crtMathDisplay"]);
}

function calculateCRT() {
  const a = parseInt(document.getElementById('crtA').value);
  const m1 = parseInt(document.getElementById('crtM1').value);
  const b = parseInt(document.getElementById('crtB').value);
  const m2 = parseInt(document.getElementById('crtM2').value);
  
  if (!a || !m1 || !b || !m2 || m1 <= 0 || m2 <= 0) {
      document.getElementById('crtResult').innerHTML = 'Por favor ingrese valores válidos';
      return;
  }
  
  const solution = crtTwoCongruences(a, m1, b, m2);
  
  if (solution === null) {
      document.getElementById('crtResult').innerHTML = `\\[\\text{Los módulos }${m1}\\text{ y }${m2}\\text{ no son coprimos}\\]`;
  } else {
      document.getElementById('crtResult').innerHTML = `\\[x \\equiv ${solution} \\pmod{${m1 * m2}}\\]`;
  }
  
  MathJax.Hub.Queue(["Typeset", MathJax.Hub, "crtResult"]);
}

function clearCRT() {
  document.getElementById('crtA').value = '';
  document.getElementById('crtM1').value = '';
  document.getElementById('crtB').value = '';
  document.getElementById('crtM2').value = '';
  document.getElementById('crtResult').innerHTML = '';
  updateCRTDisplay();
}