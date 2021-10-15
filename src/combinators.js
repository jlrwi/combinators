/*jslint
    fudge
*/

//MD # Combinators/p
//MD Useful Javascript combinators/p
//MD ##Resources:/p
//MD [Combinator Birds]
//MD (http://www.angelfire.com/tx4/cus/combinator/birds.html)/p
//MD [Avaq/combinators.js](https://gist.github.com/Avaq/1f0636ec5c8d6aed2e45)/p

// I combinator
// a -> a
const identity = function (a) {
    return a;
};

// K combinator
// a -> b -> a
const constant = function (a) {
    return function (ignore) {
        return a;
    };
};

// KI combinator
// a -> b -> b
const second = function (ignore) {
    return function (b) {
        return b;
    };
};

// A combinator, aka I combinator once removed
// Read as: apply to a - b (apply b to a)
// Alone is functionally equivalent to identity
// a -> b -> ab
const apply = function (a) {
    return function (b) {
        return a (b);
    };
};

// T combinator
// === flip (apply)
// a -> b -> ba
const apply_with = function (b) {
    return function (a) {
        return a (b);
    };
};

// W combinator
// a -> b -> abb
const join = function (a) {
    return function (b) {
        return a (b) (b);
    };
};

// I combinator twice removed
// === compose (apply) (apply)
// Identity works too
// a -> b -> c -> abc
const apply2 = function (a) {
    return function (b) {
        return function (c) {
            return a (b) (c);
        };
    };
};

// S combinator
// a -> b -> c -> acbc
const ap = function (a) {
    return function (b) {
        return function (c) {
            return a (c) (b (c));
        };
    };
};

// C combinator
const flip = function (a) {
    return function (b) {
        return function (c) {
            return a (c) (b);
        };
    };
};

// B combinator
const compose = function (a) {
    return function (b) {
        return function (c) {
            return a (b (c));
        };
    };
};

// B1 combinator
// === compose (compose) (compose)
const compose2 = function (f) {
    return function (g) {
        return function (x) {
            return function (y) {
                return f (g (x) (y));
            };
        };
    };
};

// flip (compose)
// Q combinator
const pipe = function (a) {
    return function (b) {
        return function (c) {
            return b (a (c));
        };
    };
};

// P combinator
// (b->b->c) -> (a->b) -> a -> a -> c
const on = function (f) {
    return function (g) {
        return function (x) {
            return function (y) {
                return f (g (x)) (g (y));
            };
        };
    };
};

// S2 combinator
// (b->c->d) -> (a->b) -> (a->c) -> a -> d
const converge = function (f) {
    return function (g) {
        return function (h) {
            return function (x) {
                return f (g (x)) (h (x));
            };
        };
    };
};

// === compose (converge) (converge)
const converge2 = function (f) {
    return function (g) {
        return function (h) {
            return function (x) {
                return function (y) {
                    return f (g (x) (y)) (h (x) (y));
                };
            };
        };
    };
};

const pipeN = function (...fs) {
    const last_index = fs.length - 1;

// if list of fs is empty, return the input unchanged
    if (fs.length === 0) {
        return identity;
    }

    const piper = function (idx = 0) {

        if (idx >= last_index) {
            return fs[idx];
        }

        return pipe (fs[idx]) (piper (idx + 1));
    };

    return piper (0);
};

export {
    apply,
    apply2,
    ap,
    compose,
    compose2,
    pipe,
    constant,
    second,
    flip,
    join,
    identity,
    on,
    converge,
    converge2,
    apply_with,
    pipeN
};
