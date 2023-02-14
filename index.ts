// Import stylesheets
import './style.css';
import { FCT_TRIANGLE, TriangleType } from './triangles';
import './utils';
import { Assertion, LogTests } from './utils';

/***********************************************************************************************************************
 * A FAIRE : Complétez avec votre mail UGA
 */
const mailIdentification = 'quentin.grange@etu.univ-grenoble-alpes.fr';

/***********************************************************************************************************************
 * A FAIRE : Fonction qui renvoie le type d'un triangle
 * "INVALIDE" | "SCALÈNE" | "ISOCÈLE" | "ÉQUILATÉRAL"
 */
function f(a: number, b: number, c: number): TriangleType {
  let res: TriangleType;
  if (a <= 0 || b <= 0 || c <= 0) {
    res = 'INVALIDE';
  } else if (a + b <= c || a + c <= b || b + c <= a) {
    res = 'INVALIDE';
  } else if (a === b && b === c) {
    res = 'ÉQUILATÉRAL';
  } else if (a === b || b === c || a === c) {
    res = 'ISOCÈLE';
  } else {
    res = 'SCALÈNE';
  }
  return res;
}

/***********************************************************************************************************************
 * A FAIRE : Liste de tests à effectuer
 * Chaque test est exprimé par un objet contenant 3 attributs
 *   - args : le tableau des arguments à passer à la fonction f
 *   - expectedResult : le résultat attendu
 *   - comment : un commentaire sous forme de chaine de caractère
 */
const tests: Assertion<Parameters<FCT_TRIANGLE>, ReturnType<FCT_TRIANGLE>>[] = [
  {
    args: [1, 1, 1],
    expectedResult: 'ÉQUILATÉRAL',
    comment:
      'Un triangle dont les côtés sont de même longueur devrait être classé comme équilatéral',
  },
  {
    args: [3, 4, 2],
    expectedResult: 'SCALÈNE',
    comment:
      'Un triangle dont les côtés sont de longueur 2, 3 et 4 devrait être classé comme scalène',
  },
  {
    args: [4, 2, 3],
    expectedResult: 'SCALÈNE',
    comment:
      'Un triangle dont les côtés sont de longueur 2, 3 et 4 devrait être classé comme scalène',
  },
  {
    args: [2, 3, 4],
    expectedResult: 'SCALÈNE',
    comment:
      'Un triangle dont les côtés sont de longueur 2, 3 et 4 devrait être classé comme scalène',
  },
  {
    args: [0, 0, 0],
    expectedResult: 'INVALIDE',
    comment:
      'un triangle dont les cotés sont négatifs n existe pas on renvoie donc invalide et non pas ÉQUILATÉRAL',
  },
  {
    args: [0, 3, 3],
    expectedResult: 'INVALIDE',
    comment:
      'un triangle dont les cotés sont = 0 n existe pas on renvoie donc invalide et non pas ÉQUILATÉRAL',
  },
  {
    args: [3, 0, 3],
    expectedResult: 'INVALIDE',
    comment:
      'un triangle dont les cotés sont = 0 n existe pas on renvoie donc invalide et non pas ÉQUILATÉRAL',
  },
  {
    args: [3, 3, 0],
    expectedResult: 'INVALIDE',
    comment:
      'un triangle dont les cotés sont = 0 n existe pas on renvoie donc invalide et non pas ÉQUILATÉRAL',
  },
  {
    args: [-1, -1, -1],
    expectedResult: 'INVALIDE',
    comment:
      'un triangle dont les cotés sont négatifs n existe pas on renvoie donc invalide et non pas ÉQUILATÉRAL',
  },
  {
    args: [-1, 1, 1],
    expectedResult: 'INVALIDE',
    comment:
      'un triangle dont les cotés sont négatifs n existe pas on renvoie donc invalide et non pas ÉQUILATÉRAL',
  },
  {
    args: [1, -1, 1],
    expectedResult: 'INVALIDE',
    comment:
      'un triangle dont les cotés sont négatifs n existe pas on renvoie donc invalide et non pas ÉQUILATÉRAL',
  },
  {
    args: [1, 1, -1],
    expectedResult: 'INVALIDE',
    comment:
      'un triangle dont les cotés sont négatifs n existe pas on renvoie donc invalide et non pas ÉQUILATÉRAL',
  },
  {
    args: [5, 8, 5],
    expectedResult: 'ISOCÈLE',
    comment:
      'un triangle dont exactement 2 cotés sont de même valeurs est un triangle isocele',
  },
  {
    args: [8, 5, 5],
    expectedResult: 'ISOCÈLE',
    comment:
      'un triangle dont exactement 2 cotés sont de même valeurs est un triangle isocele',
  },
  {
    args: [5, 5, 8],
    expectedResult: 'ISOCÈLE',
    comment:
      'un triangle dont exactement 2 cotés sont de même valeurs est un triangle isocele',
  },
  {
    args: [1, 10, 1],
    expectedResult: 'INVALIDE',
    comment:
      'un tiangle dont la somme des 2 cotés les plus petits est <= au dernier coté n est pas un triangle. ',
  },
  {
    args: [1, 1, 10],
    expectedResult: 'INVALIDE',
    comment:
      'un tiangle dont la somme des 2 cotés les plus petits est <= au dernier coté n est pas un triangle. ',
  },
  {
    args: [10, 1, 1],
    expectedResult: 'INVALIDE',
    comment:
      'un tiangle dont la somme des 2 cotés les plus petits est <= au dernier coté n est pas un triangle. ',
  },
  {
    args: [10, 5, 5],
    expectedResult: 'INVALIDE',
    comment:
      'Un triangle dont 1 coté = les 2 côtés restant est invalide',
  },
  {
    args: [5, 10, 5],
    expectedResult: 'INVALIDE',
    comment:
      'Un triangle dont 1 coté = les 2 côtés restant est invalide',
  },
  {
    args: [5, 5, 10],
    expectedResult: 'INVALIDE',
    comment:
      'Un triangle dont 1 coté = les 2 côtés restant est invalide',
  },
];

/***********************************************************************************************************************
 * NE PAS TOUCHER !!!
 */
LogTests<FCT_TRIANGLE>(
  "Fonction qui renvoie le type d'un triangle",
  f,
  'f',
  tests,
  document.querySelector('#local')
);

const url =
  'https://script.google.com/macros/s/AKfycbxxO_nqpAm1oND1lD1KSp99wpKyNNilS0U7naYP0-9sOk2UomM_CSjfWaCqumyzEIaZ/exec';

const bt = document.querySelector('button');
const section = document.querySelector('#results');

bt.onclick = async () => {
  bt.disabled = true;
  const fstr = f.toString();
  const bodyStr = fstr.slice(fstr.indexOf('{') + 1, fstr.lastIndexOf('}'));

  const form = new FormData();
  form.append('id', mailIdentification);
  form.append('f', bodyStr);
  form.append('tests', JSON.stringify(tests));

  console.log('POST...');
  const R = await fetch(url, {
    method: 'POST',
    body: form,
  });
  console.log('...received response ...');
  const res = await R.json();
  console.log('... response decoded.');
  let t = 0;
  if (res.error) {
    section.innerHTML = `<pre>${res.error}</pre>`;
    const [, strT] = /([0-9]*) secondes$/.exec(res.error);
    t = +strT;
    console.log(strT, t);
    const inter = setInterval(() => {
      t--;
      if (t <= 0) {
        bt.disabled = false;
        section.textContent = '';
        clearInterval(inter);
      } else {
        section.innerHTML = `<pre>Vous ne pouvez pas resoumettre avant ${t} secondes
  </pre>`;
      }
    }, 1000);
  } else {
    console.log('no errors...');
    section.innerHTML = `
      Tests de référence passés par votre code (vert = le test passe):<br/>
      <table class="result"><tbody><tr>
      ${res.testPassed
        .map((t, i) => `<td class="${t ? '' : 'in'}correct">${i}</td>`)
        .join('')}
      </tr></tbody></table>
      <br/><br/>
      Vos tests passés sur le code de référence :<br/>
      <table class="result"><tbody><tr>
      ${res.testsVsCoderef
        .map((t, i) => `<td class="${t ? '' : 'in'}correct">${i}</td>`)
        .join('')}
      </tr></tbody></table>
      <br/><br/>
      Mutants éliminés par votre code (vert = le mutant est éliminé) :<br/>
      <table class="result"><tbody><tr>
      ${res.discardedMutants
        .map((t, i) => `<td class="${t ? '' : 'in'}correct">${i}</td>`)
        .join('')}
      </tr></tbody></table>
    `;
  }
};
