function boxtitleToEquation(arrBox, isLeft) {
  // isLeft merupakan penanda apakah box tersebut berada di sisi kiri bila benar, apabila box diatas gunakan false
  // example output : Eqx = 2, EqConst = 1 ==> 2X + 1
  let EqX = 0;
  let EqConst = 0;

  for (const box in arrBox) {
    switch (arrBox[box]) {
      case "X^2":
        EqX += 1;
        break;
      case "X ":
        isLeft ? (EqX += 1) : (EqConst += 1);
        break;
      case "X":
        !isLeft ? (EqX += 1) : (EqConst += 1);
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

  // ======= MERGE SECTION =======
  const EqX = firstEqPlus.EqX - firstEqMinus.EqX;
  const EqConst = firstEqPlus.EqConst - firstEqMinus.EqConst;

  const EqX2 = secondEqPlus.EqX - secondEqMinus.EqX;
  const EqConst2 = secondEqPlus.EqConst - secondEqMinus.EqConst;

  return { EqX, EqConst, EqX2, EqConst2 };
}
