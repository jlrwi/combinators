/*jslint
    fudge
*/

// Resource: http://www.angelfire.com/tx4/cus/combinator/birds.html

/*
Should create documentation?
*/

/*
Should we put in type-checking to give useful error output if function values
aren't functions?
*/

// I combinator
const identity = function (a) {
    return a;
};

// K combinator
const constant = function (a) {
    return function (ignore) {
        return a;
    };
};

// KI combinator
const second = function (ignore) {
    return function (b) {
        return b;
    };
};

// A combinator, aka I combinator once removed
// Read as: apply to a - b (apply by to a)
// Alone is functionally equivalent to identity
const apply = function (a) {
    return function (b) {
        return a (b);
    };
};

// T combinator
// === flip (apply)
const apply_with = function (a) {
    return function (b) {
        return b (a);
    };
};

// W combinator
const join = function (a) {
    return function (b) {
        return a (b) (b);
    };
};

// === compose (apply) (apply)
// I combinator twice removed
// Can just use identity
/*
const apply2 = function (a) {
    return function (b) {
        return function (c) {
            return a (b) (c);
        };
    };
};
*/

// S combinator
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

// flip (compose)
// Q combinator
const pipe = function (a) {
    return function (b) {
        return function (c) {
            return b (a (c));
        };
    };
};

// P combinator?
// (b->b->c) -> (a->b) -> a -> a -> c
// labcd.a(bc)(bd)
const on = function (f) {
    return function (g) {
        return function (x) {
            return function (y) {
                return f (g (x)) (g (y));
            };
        };
    };
};

// (b->c->d) -> (a->b) -> (a->c) -> a -> d
// labcd.a(bd)(cd)
const converge = function (f) {
    return function (g) {
        return function (h) {
            return function (x) {
                return f (g (x)) (h (x));
            };
        };
    };
};

// could this be rewritten to return fs.reduce()?
const pipeN = function (...fs) {
    const last_index = fs.length - 1;

    // If list of fs is empty, return the input unchanged
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
//    apply2,
    ap,
    compose,
    pipe,
    constant,
    second,
    flip,
    join,
    identity,
    on,
    converge,
    apply_with,
    pipeN
};
