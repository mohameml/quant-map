# Patterns :

> A probability pattern is a recurring reasoning strategy used to solve a class of problems by applying
> a structural idea (symmetry, linearity, conditioning, decomposition, etc.)
> or a mathematical identity (Bayes, total probability, etc.).

- Idea that reccurent in the prona problems :
    - it can be a formula like bayes : P(A|B) = P(A \inter B)P(B) (with the diff variations)
    - it can be just a idea like : symetery

## 1. Union Decomposition :

> To compute the probability of a complex event, try to decompose it as a union of simpler events. Then:

- if they are disjoint → sum probabilities
- otherwise → use inclusion-exclusion or complements

- Case 1 : disjoint => P(U*i A_i) = \sum*{i}^{n} P(A_i)
- Case 2 : indep => P(U_i A_i) = 1 - P(∩ A_i^c)
