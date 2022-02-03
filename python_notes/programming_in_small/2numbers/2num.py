

def add(l1, l2):
    result = []
    print(len(l2))
    if len(l1) == 0 and len(l2) == 0:
        return []
    if len(l1) >= len(l2):
        for x in range(len(l2)):
            result.append(l1[x]+l2[x])
        result.extend(l1[len(l2):])
    else:
        for x in range(len(l1)):
            result.append(l1[x]+l2[x])
        result.extend(l2[len(l1):])
    return result


assert len(add([], [])) == 0
assert(add([1, 2], [1, 2, 3, 4]) == [2, 4, 3, 4])
assert(add([1, 2, 3, 4], [1, 2],) == [2, 4, 3, 4])

# another version w/o duplicate code


def add2(l1, l2):
    if len(l1) >= l2:
        larger = l1
        smaller = l2
    else:
        larger = l2
        smaller = l1
    result = []
    for(x in range(len(smaller))):
        result.append(larger[x]+smaller[x])
        result.extend(larger[len(smaller):])
    return result


assert len(add([], [])) == 0
assert(add2([1, 2], [1, 2, 3, 4]) == [2, 4, 3, 4])
assert(add2([1, 2, 3, 4], [1, 2],) == [2, 4, 3, 4])
