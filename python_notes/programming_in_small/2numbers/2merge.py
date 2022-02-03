

import math


def merge(l1, l2):
    i = 0
    j = 0
    res = []
    while i < len(l1) and j < len(l2):
        if(l1[i] <= l2[j]):
            res.append(l1[i])
            i += 1
        else:
            res.append(l2[j])
            j += 1
    res = res + l1[i:] + l2[j:]
    return res

# this is from a leetcode problem, get the median from 2 sorted lists.
# kind of stupid marked as hard.


def median(l1, l2):
    m = merge(l1, l2)
    print("m length:", len(m), m)
    res = None
    if len(m) % 2 == 0:
        res = (m[(len(m)/2)-1]+m[len(m)/2])
        res = res/2.
    else:
        res = m[int(len(m)/2)]
    print("res:", res)
    return res


# kinda cute cause one list is of 0 length.
# maybe add an assert if len(l1)==0 || len(l2)==0 for safety
assert(merge([1, 3, 6], [2, 4]) == [1, 2, 3, 4, 6])
assert (median([1, 3], [2]) == 2)
assert (median([1, 2], [3, 4]) == 2.5)
