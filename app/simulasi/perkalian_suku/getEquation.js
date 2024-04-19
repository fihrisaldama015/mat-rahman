function boxtitleToEquation(arrBox, isTop) {
  // isTop merupakan penanda apakah box tersebut berada di sisi atas bila benar, apabila box yang dicek dikiri gunakan false
  // example output : Eqx = 2, EqConst = 1 ==> 2X + 1
  let EqX = 0;
  let EqConst = 0;

  for (const box in arrBox) {
    if(arrBox[box].substring(0, 1) === "-"){
      arrBox[box] = arrBox[box].substring(1);
    }

    switch (arrBox[box]) {
      case "X^2":
        EqX += 1;
        break;
      case "X ":
        isTop ? (EqX += 1) : (EqConst += 1);
        break;
      case "X":
        !isTop ? (EqX += 1) : (EqConst += 1);
        break;
      case "1":
        EqConst += 1;
        break;
      default:
        break;
    }
  }
  return { EqX, EqConst };
}
function getEquationTitleFromArr(arr, isTop) {
  let result = [];
  const tempItems = arr[0];
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i])
    if (isTop) {
      if (tempItems.top === arr[i].top) {
        result.push(arr[i].title);
      }
    } else {
      if (tempItems.left === arr[i].left) {
        result.push(arr[i].title);
      }
    }
  }
  console.log(isTop, result)
  return result;
}
function splitPlusMinus(arr, isMin = false) {
  let arrPlus = [];
  let arrMin = [];
  for (const key in arr) {
    if (arr.hasOwnProperty(key)) {
      if (arr[key].title.substring(0, 1) === "-") {
        arrMin.push(arr[key]);
      } else {
        arrPlus.push(arr[key]);
      }
    }
  }

  if (isMin) {
    return arrMin;
  }
  return arrPlus;
}

export function getEquation(arr) {
  const plusArr = splitPlusMinus(arr);
  const minArr = splitPlusMinus(arr, true);

  // ======= PLUS SECTION =======
  const findTopPlus = plusArr.sort((a, b) => a.top - b.top); // ascending sort using top component
  const findLeftPlus = plusArr.sort((a, b) => a.left - b.left); // ascending sort using left component
  // console.log("ini Top :",findTopPlus)
  // console.log("ini left :",findLeftPlus)
  const firstEqPlus = boxtitleToEquation(
    getEquationTitleFromArr(findTopPlus, true),
    true
  );
  const secondEqPlus = boxtitleToEquation(
    getEquationTitleFromArr(findLeftPlus, false),
    false
  );

  // ======= MINUS SECTION =======
  const findTopMinus = minArr.sort((a, b) => a.top - b.top); // ascending sort using top component
  const findLeftMinus = minArr.sort((a, b) => a.left - b.left); // ascending sort using left component

  const firstEqMinus = boxtitleToEquation(
    getEquationTitleFromArr(findTopMinus, true),
    true
  );
  const secondEqMinus = boxtitleToEquation(
    getEquationTitleFromArr(findLeftMinus, false),
    false
  );
  // console.log("ini minus:",secondEqMinus,firstEqMinus)
  // console.log("ini plus:",secondEqPlus,firstEqPlus)
  // ======= MERGE SECTION =======
  const EqX = firstEqPlus.EqX
  const EqConst = firstEqPlus.EqConst - firstEqMinus.EqConst;

  const EqX2 = secondEqPlus.EqX
  const EqConst2 = secondEqPlus.EqConst - secondEqMinus.EqConst;

  return { EqX, EqConst, EqX2, EqConst2 };
}

export function getEquationPenjabaran(EqX, EqX2, EqConst, EqConst2) {
  const constantaX = EqX*EqConst2 + EqX2*EqConst
  const constanta = EqConst*EqConst2

  const constantaXString = constantaX >= 0 ? `+ ${constantaX}` : `${constantaX}`
  const constantaString = constanta >= 0 ? `+ ${constanta}` : `${constanta}`
  return `${EqX*EqX2}X^2 ${constantaXString}X ${constantaString}`;
}

export function getPenjabaran(Eqx, Eqx2, EqConst, EqConst2) {
  let penjabaran = "";
  penjabaran += '( '
  if(Eqx !== 0){
    penjabaran += `${Eqx}X`;
  }
  if(EqConst !== 0){
    penjabaran += EqConst > 0 ? `+ ${EqConst}` :`${EqConst}`;
  }
  penjabaran += ' ) ( '

  if(Eqx2 !== 0){
    penjabaran += `${Eqx2}X`;
  }
  if(EqConst2 !== 0){
    penjabaran += EqConst2 > 0 ? `+ ${EqConst2}` :`${EqConst2}`;
  }
    penjabaran += ' )'
  return penjabaran;
}
