// Import stylesheets
import './style.css';
import { FCT_TRIANGLE, TriangleType } from './triangles';
import './utils';
import { Assertion, LogTests } from './utils';

/***********************************************************************************************************************
 * A FAIRE : Complétez avec votre mail UGA
 */
const mailIdentification = 'prénom.nom@univ-grenoble-alpes.fr';

/***********************************************************************************************************************
 * A FAIRE : Fonction qui renvoie le type d'un triangle
 * "INVALIDE" | "SCALÈNE" | "ISOCÈLE" | "ÉQUILATÉRAL"
 */
function f(a: number, b: number, c: number): TriangleType {
  return 'SCALÈNE';
}

/***********************************************************************************************************************
 * A FAIRE : Liste de tests à effectuer
 * Chaque test est exprimé par un objet contenant 3 attributs
 *   - args : le tableau des arguments à passer à la fonction f
 *   - expectedResult : le résultat attendu
 *   - comment : un commentaire sous forme de chaine de caractère
 */
const tests: Assertion<Parameters<FCT_TRIANGLE>, ReturnType<FCT_TRIANGLE>>[] = [
  { args: [1, 1, 1], expectedResult: 'ÉQUILATÉRAL', comment: 'Un triangle dont les côtés sont de longueur 1 devrait être classé comme équilatéral' },
  { args: [2, 3, 4], expectedResult: 'SCALÈNE', comment: 'Un triangle dont les côtés sont de longueur 2, 3 et 4 devrait être classé comme scalène' },
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

console.log("POST...")
  const R = await fetch(url, {
    method: 'POST',
    body: form,
  });
  console.log("...received response ...")
  const res = await R.json();
  console.log("... response decoded.")
  let t = 0;
  if (res.error) {
    section.innerHTML = `<pre>${res.error}</pre>`;
    const [,strT] = /([0-9]*) secondes$/.exec(res.error);
    t = + strT;
    console.log(strT, t);
    const inter = setInterval( () => {
      t--;
      if (t <= 0) {
        bt.disabled = false;
        section.textContent = '';
        clearInterval(inter);
      } else {
        section.innerHTML = `<pre>Vous ne pouvez pas resoumettre avant ${t} secondes
  </pre>`;
      }
    }, 1000 );
  } else {
    console.log("no errors...")
    section.innerHTML = `
      Tests de référence passés par votre code (vert = le test passe):<br/>
      <table class="result"><tbody><tr>
      ${res.testPassed.map((t, i) => `<td class="${t?'':'in'}correct">${i}</td>`).join('')}
      </tr></tbody></table>
      <br/><br/>
      Vos tests passés sur le code de référence :<br/>
      <table class="result"><tbody><tr>
      ${res.testsVsCoderef.map((t, i) => `<td class="${t?'':'in'}correct">${i}</td>`).join('')}
      </tr></tbody></table>
      <br/><br/>
      Mutants éliminés par votre code (vert = le mutant est éliminé) :<br/>
      <table class="result"><tbody><tr>
      ${res.discardedMutants.map((t, i) => `<td class="${t?'':'in'}correct">${i}</td>`).join('')}
      </tr></tbody></table>
    `;
  }
};
