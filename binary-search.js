/////////////////////////////////////////////////////////////////

function countZeros(arr) {
  return countZerosLR(arr, 0, arr.length - 1);
}

function countZerosLR(arr, left, right) {
  // console.log("LR:", left, right);
  if (left > right) {
    return 0;
  } else if (left == right) {
    return 1 - arr[left]; // if it's a 0, then we have 1 zero, else none
  } else if (right == left + 1) {
    if (arr[left] == 0) {
      // 0 0
      return 2;
    } else if (arr[right] == 1) {
      // 1 1
      return 0;
    } else return 1; // 1 0
  } else {
    const mid = Math.floor((left + right) / 2);
    // console.log("mid:", mid);
    let tot;
    if (arr[mid] == 0) {
      // so everything past mid has to be zero, count left size & add all from mid to right end
      tot = countZerosLR(arr, left, mid - 1) + (right - mid + 1);
    } else {
      tot = countZerosLR(arr, mid + 1, right);
      // so everything to left of mid has to be ones, count right size
    }
    return tot;
  }
}

/////////////////////////////////////////////////////////////////

function sortedFrequency(arr, tgt) {
  return sortedFrequencyLR(arr, 0, arr.length - 1, tgt);
}

function sortedFrequencyLR(arr, left, right, tgt) {
  // console.log("LR", left, right);
  if (left > right) {
    return 0;
  } else if (left == right) {
    if (arr[left] == tgt) {
      return 1;
    } else {
      return 0;
    }
  } else if (arr[right] < tgt) {
    return 0;
  } else if (arr[left] > tgt) {
    return 0;
  } else if (right == left + 1) {
    return (
      sortedFrequencyLR(arr, left, left, tgt) +
      sortedFrequencyLR(arr, right, right, tgt)
    );
  } else if (arr[left] == tgt && arr[right] == tgt) {
    return right - left + 1;
  } else {
    const mid = Math.floor((left + right) / 2);
    const tot =
      sortedFrequencyLR(arr, left, mid - 1, tgt) +
      sortedFrequencyLR(arr, mid, mid, tgt) +
      sortedFrequencyLR(arr, mid + 1, right, tgt);
    // console.log("tot", tot);
    return tot;
  }
}

/////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////

function binSearch(arr, target) {
  const len = arr.length;
  binSearchIn(arr, 0, len - 1, target);
  //   console.log(len);
}

function binSearchIn(arr, left, right, target) {
  console.log("looking @ ", left, right);
  if (target == arr[left]) {
    console.log("found at index: ", left);
    return;
  } else if (target == arr[right]) {
    console.log("found at index: ", right);
    return;
  }
  if (left == right || left == right - 1) {
    console.log("not found");
    return;
  }
  const mid = Math.floor((left + right) / 2);
  if (target < arr[mid]) {
    binSearchIn(arr, left, mid, target);
  } else {
    binSearchIn(arr, mid, right, target);
  }
}

/////////////////////////////////////////////////////////////////

function findRotatedIndex(arr, tgt) {
  return findRotatedIndexLR(arr, 0, arr.length - 1, tgt);
}

function findRotatedIndexLR(arr, left, right, tgt) {
  console.log("left:", left, "right", right);
  if (left > right) {
    return -1;
  } else if (left == right) {
    if (arr[left] == tgt) {
      return left;
    } else {
      return -1;
    }
  } else if (right == left + 1) {
    if (arr[left] == tgt) {
      return left;
    } else if (arr[right] == tgt) {
      return right;
    } else return -1;
  } else {
    const mid = Math.floor((left + right) / 2);
    let index;
    if (arr[left] < arr[mid]) {
      if (arr[left] <= tgt && tgt <= arr[mid]) {
        console.log("go in left side");
        index = findRotatedIndexLR(arr, left, mid, tgt);
      } else {
        console.log("flip to right side");
        index = findRotatedIndexLR(arr, mid, right, tgt);
      }
    } else {
      if (arr[mid] <= tgt && tgt <= arr[right]) {
        console.log("go in right side");
        index = findRotatedIndexLR(arr, mid, right, tgt);
      } else {
        console.log("flip to left size");
        index = findRotatedIndexLR(arr, left, mid, tgt);
      }
    }
    return index;
  }
}

/////////////////////////////////////////////////////////////////

function findRotationCount(arr) {
  return findRotationCountLR(arr, 0, arr.length - 1);
}

function findRotationCountLR(arr, left, right) {
  // """ recursive look for where go from highest value to lowest value"""
  console.log("LR", left, right);
  if (right <= left) {
    // order is fine, no rotation
    return 0;
  }
  if (arr[left] < arr[right]) {
    // iff rotated, then first of array > last of array
    return 0;
  }
  if (right == left + 1) {
    // base case, switched order on 2-element array, rotation of n=1
    return 1;
  }
  const mid = Math.floor((left + right) / 2);
  if (arr[left] < arr[mid]) {
    // left side order is good, order must be messed up in right side...
    // so rotation n is size of left side + rotation in right
    const n = mid - left + 1 + findRotationCountLR(arr, mid + 1, right);
    console.log("n (right)", n);
    return n;
  } else {
    // ow, order must be messed up in left side
    // so rotation n of whole array is just rotation n of left side
    n = findRotationCountLR(arr, left, mid - 1);
    // BUT if left side looks ordered (i.e. rotation is 0), but whole array is not OK (ow wouldn't be here),
    // then rotation is exactly the size of the left side
    // (ex.  [4,5,6] [1,2,3] ==> rotation of 3)
    if (n == 0) {
      return mid;
    }
    console.log("n (left)", n);
    return n;
  }
}

/////////////////////////////////////////////////////////////////

function findFloor(arr, tgt) {
  return findFloorLR(arr, 0, arr.length - 1, tgt);
}

function findFloorLR(arr, left, right, tgt) {
  // console.log("LR", left, right);
  if (left > right) {
    return -1;
  }
  if (tgt < arr[left]) {
    return -1;
  }
  if (tgt >= arr[right]) {
    return arr[right];
  }
  if (left == right) {
    // down to one element, & too big
    return -1;
  }
  const mid = Math.floor((left + right) / 2);
  // console.log("mid", mid, "el", arr[mid], "tgt", tgt);
  if (arr[mid] > tgt) {
    // mid is too big, floor must be on left side
    const floor = findFloorLR(arr, left, mid - 1, tgt);
    return floor;
  } else {
    // left side are all smaller, check right side, hold mid element in reserve
    let floor = findFloorLR(arr, mid + 1, right, tgt);
    if (floor == -1) {
      // console.log("revert to mid entry", mid, arr[mid]);
      floor = arr[mid];
    }
    return floor;
  }
}
