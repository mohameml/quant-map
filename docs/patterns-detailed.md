# ProbaCode — Pattern Taxonomy

> Each pattern is a **reusable problem-solving strategy**. Learn to recognize which pattern applies, and the solution often writes itself.

---

## 🔹 CORE (must master)

### 1. Counting & Combinatorics

**Definition:** Problems that require you to count the number of ways something can happen, then compute a probability as (favorable outcomes) / (total outcomes). The foundation of discrete probability.

**Recognition:**

- The problem asks "how many ways" or "what is the probability of an exact configuration"
- You're choosing, arranging, or distributing distinct or identical objects
- The sample space is finite and uniform (equally likely outcomes)
- You see keywords: "choose", "arrange", "at least one", "no two adjacent", "distinct"

**Canonical Problems:**

- How many ways to distribute _k_ identical balls into _n_ distinct bins? (stars and bars)
- What is the probability that a random 5-card poker hand is a full house?
- A committee of 5 is chosen from 6 men and 4 women. What is P(at least 2 women)?
- How many binary strings of length _n_ have no two consecutive 1s?
- Using inclusion-exclusion: how many surjections exist from a set of _m_ elements to _n_ elements?
- In a room of _n_ people, what is the probability that no two share a birthday month? (pigeonhole variant)

---

### 2. Conditional Probability & Bayes

**Definition:** Problems where the probability of an event changes based on partial information. You use the chain rule P(A∩B) = P(A|B)·P(B) and Bayes' theorem to reverse the conditioning direction.

**Recognition:**

- The problem gives you sequential or staged information ("given that", "knowing that", "if we observe")
- You need to update a belief after seeing evidence → Bayes
- There's a natural partition of the sample space (cases) → Law of Total Probability
- Medical tests, false positives, filtering, classification setups

**Canonical Problems:**

- A test for a rare disease has 95% sensitivity and 99% specificity. A random person tests positive. What is P(disease)?
- You pick a random coin from a bag (fair or biased), flip it 3 times and get 3 heads. What is P(biased coin)?
- Two envelopes contain different amounts. You open one and see $100. Should you switch? (conditional reasoning)
- A family has two children. Given that at least one is a boy, what is P(both are boys)?
- Three prisoners problem / Monty Hall

---

### 3. Linearity of Expectation

**Definition:** E[X + Y] = E[X] + E[Y] **always**, even when X and Y are dependent. This lets you decompose a complex random variable into simple pieces and compute the expectation of each piece separately, avoiding joint distributions entirely.

**Recognition:**

- The problem asks for an expected value of something that can be decomposed into a sum
- Direct computation would require summing over an impossibly large sample space
- You can write the quantity as X = X₁ + X₂ + ... + Xₙ where each Xᵢ is simple
- Often paired with indicator variables (pattern #10)
- Keywords: "expected number of", "on average how many"

**Canonical Problems:**

- Expected number of fixed points in a random permutation of _n_ elements
- Expected number of inversions in a random permutation
- Hat problem: _n_ people throw hats in a pile and each picks one randomly. Expected number who get their own hat?
- Expected number of record values (left-to-right maxima) in a random permutation
- Expected number of empty bins when throwing _m_ balls into _n_ bins
- Expected number of edge-disjoint triangles in a random graph

---

### 4. Conditional Expectation

**Definition:** E[X|Y] is itself a random variable — it's the best prediction of X given knowledge of Y. The tower property E[E[X|Y]] = E[X] lets you break hard expectation computations into stages by conditioning on useful intermediate information.

**Recognition:**

- The problem has a natural "first thing that happens" you can condition on
- There's a hidden or latent variable that simplifies the computation
- The problem involves a mixture of distributions (e.g., N is random, then X|N is something)
- You see a recursive structure where the problem resets after a partial outcome
- Keywords: "given that the first...", "suppose N is random and then..."

**Canonical Problems:**

- A stick of length 1 is broken at a uniform random point. What is E[longer piece]?
- Random number of coin flips: N ~ Poisson(λ), each flip is H with probability p. What is E[number of heads]?
- Variance of a compound Poisson process: E[Var(X|N)] + Var(E[X|N])
- Expected number of rolls of a fair die until you see all 6 faces (via conditioning on stages)
- You draw cards without replacement until you get an ace. What is E[number of draws]?

---

### 5. Independence

**Definition:** Events A and B are independent if P(A∩B) = P(A)·P(B). Random variables X and Y are independent if their joint distribution factors: f(x,y) = f(x)·f(y). Independence simplifies everything — products replace convolutions.

**Recognition:**

- The problem explicitly states "independent" trials/samples
- You need to check whether events are independent vs. just uncorrelated
- Pairwise independence ≠ mutual independence (a classic trap)
- The problem involves products of probabilities across trials

**Canonical Problems:**

- Flip 3 fair coins. Are "first coin is H" and "majority are H" independent?
- Give an example of three events that are pairwise independent but not mutually independent
- X and Y are i.i.d. Uniform(0,1). What is P(X + Y > 1)?
- Are "X > 0" and "X² > 1" independent when X ~ N(0,1)?
- Show that uncorrelated Gaussian random variables are independent (and why this fails for non-Gaussian)

---

### 6. First-Step Analysis & Recursion

**Definition:** Condition on what happens at the first step (first flip, first draw, first transition) to write a recurrence relation for the quantity of interest. Solve the recurrence to get the answer. The most universal technique in probability interviews.

**Recognition:**

- The problem involves a process that "resets" or partially resets after the first move
- You can write E[X] or P(event) in terms of itself after one step
- The problem has a recursive or Markov-like flavor
- Keywords: "expected number of steps until", "probability of eventually", "starting from state i"
- The answer involves solving a linear system or a simple recurrence

**Canonical Problems:**

- Expected number of coin flips to see two consecutive heads (HH)
- Expected number of flips to see the pattern HTH
- A frog starts at 0 on the number line, jumps +1 or -1 equally. What is P(reach +n before -m)?
- Expected number of steps for a random walk to return to the origin
- A gambler starts with $k, bets $1 each round (win p, lose 1-p). What is P(reach $n before $0)?
- Expected number of rolls of a die to see a 6, given the last roll was not a 5

---

## 🔹 DISTRIBUTIONS

### 7. Discrete Distributions

**Definition:** Probability distributions on countable outcomes (integers). Each distribution models a specific type of random experiment. Knowing when to recognize and apply each distribution is essential.

**Recognition:**

- **Binomial(n,p):** Fixed number of independent trials, count successes
- **Geometric(p):** Number of trials until first success
- **Negative Binomial(r,p):** Number of trials until r-th success
- **Poisson(λ):** Count of rare events in a fixed interval, or limit of Binomial when n→∞, p→0, np→λ
- **Hypergeometric:** Sampling without replacement from a finite population

**Canonical Problems:**

- 10 fair coins are flipped. What is P(exactly 7 heads)?
- A machine produces 5% defective items. What is P(first defective on the 8th item)?
- What is the expected number of rolls of a die to get three 6s?
- Emails arrive at rate 4/hour. What is P(more than 6 in the next hour)?
- A deck has 4 aces. You draw 5 cards without replacement. What is P(exactly 2 aces)?
- Approximate Binomial(1000, 0.002) using Poisson. What is P(X ≥ 3)?

---

### 8. Continuous Distributions

**Definition:** Probability distributions on real-valued outcomes defined by a density function f(x). Probabilities are computed as integrals rather than sums.

**Recognition:**

- **Uniform(a,b):** "Pick a random point in [a,b]" — all locations equally likely
- **Exponential(λ):** Time between events in a Poisson process, memoryless property
- **Normal(μ,σ²):** CLT limit, symmetric bell curve, appears everywhere
- **Gamma(α,β):** Sum of α independent Exponential(β) variables, waiting time to α-th event
- **Beta(α,β):** Distribution on [0,1], conjugate prior for Binomial, order statistics of Uniform

**Canonical Problems:**

- X ~ Uniform(0,1). What is E[max(X, 1-X)]?
- A lightbulb has Exponential(λ) lifetime. Given it has survived 5 hours, what is E[remaining life]? (memoryless)
- X ~ N(0,1). Compute E[X | X > 0] (truncated normal)
- The sum of 100 i.i.d. Uniform(0,1) random variables — approximate P(sum > 55) using CLT
- Two independent Exponential(1) random variables: what is the distribution of their ratio?
- X ~ Exponential(1). What is the distribution of ⌊X⌋? (connection to Geometric)

---

### 9. Joint Distributions

**Definition:** The complete description of two or more random variables together. From the joint distribution you can derive marginals, conditionals, covariance, and determine independence. Transformations of joint distributions require Jacobians.

**Recognition:**

- The problem involves two or more random variables and asks about their relationship
- You need P(X < Y) or E[XY] or Cov(X,Y)
- You're asked to find the distribution of a function of multiple RVs (min, max, sum, ratio)
- Change of variables or Jacobian is needed

**Canonical Problems:**

- X, Y i.i.d. Uniform(0,1). What is P(X + Y < 1)? What is the density of X + Y?
- X, Y i.i.d. Exponential(1). Find the distribution of X/(X+Y) (Beta connection)
- Compute Cov(X, X²) where X ~ N(0,1)
- (X,Y) uniform on the unit disk. Find the marginal distribution of X
- Given the joint density f(x,y) = 6(1-y) for 0 < x < y < 1, find E[X|Y=y]

---

## 🔹 PROBLEM PATTERNS

### 10. Indicator Variables

**Definition:** Write a complex count as a sum of indicator (0/1) random variables, one for each "unit" that might contribute. Since E[1_A] = P(A), computing the expectation reduces to computing individual probabilities. The most elegant trick in combinatorial probability.

**Recognition:**

- The problem asks "expected number of [things] that satisfy [property]"
- Each "thing" either contributes 1 or 0 to the total
- Direct counting is impossible because of dependencies, but individual probabilities are easy
- Often combined with Linearity of Expectation (pattern #3)

**Canonical Problems:**

- Expected number of fixed points in a random permutation (E[Σ 1(σ(i)=i)] = n · 1/n = 1)
- Expected number of people who get their own hat back in the hat problem
- Expected number of collisions when hashing _n_ keys into _m_ slots
- Expected number of runs (consecutive sequences of same value) in a binary string
- Expected number of local maxima in a random permutation
- Expected number of distinct values when drawing _n_ samples from {1,...,m} with replacement

---

### 11. Symmetry & Exchangeability

**Definition:** When all orderings or labelings are equally likely, use symmetry to bypass calculation. Exchangeable random variables have the same joint distribution under any permutation, which means all "positions" are equivalent. This often reduces an apparently hard problem to a one-liner.

**Recognition:**

- All elements play the same role (random permutation, i.i.d. samples, random ordering)
- The problem asks about a specific position, rank, or element, but there's nothing special about it
- P(Xᵢ is the max) = 1/n by symmetry for i.i.d. or exchangeable variables
- The answer "should" be the same for all indices by symmetry

**Canonical Problems:**

- X₁,...,Xₙ are i.i.d. continuous. What is P(X₁ = max)? → 1/n by symmetry
- Expected number of fixed points in a random permutation (each position has P(fixed) = 1/n)
- A random permutation of {1,...,n}: what is the expected number of cycles? → Σ 1/k = Hₙ
- X, Y i.i.d. from any continuous distribution. What is P(X < Y)? → 1/2
- What is the probability that the maximum of a random sample appears in the last position? → 1/n
- _n_ people are in a random line. What is P(person 1 is directly before person 2)? → 1/n
- What is E[rank of a randomly chosen element in a random permutation]? → (n+1)/2

---

### 12. Balls & Bins / Birthday

**Definition:** Throw _m_ balls (objects, keys, people) into _n_ bins (slots, days, buckets) uniformly at random. Analyze collisions, empty bins, max load, and occupancy. The Birthday Problem is the most famous instance.

**Recognition:**

- Random assignment of objects to categories
- Hashing, load balancing, collision detection scenarios
- "What is the probability that two share the same..."
- Questions about empty bins, maximum occupancy, or first collision

**Canonical Problems:**

- Birthday problem: how many people until P(collision) > 50%? → ~23 for 365 days, ~√(πn/2) in general
- Expected number of empty bins when throwing _m_ balls into _n_ bins → n(1 - 1/n)^m
- Expected maximum load when throwing _n_ balls into _n_ bins → O(log n / log log n)
- What is P(all bins have at least one ball)? (coupon collector connection)
- Hash _n_ keys into a table of size _m_. Expected number of collisions?
- Generalized birthday: probability that at least 3 people share the same birthday

---

### 13. Coupon Collector

**Definition:** There are _n_ distinct types. Each draw gives a uniformly random type. How long until you've seen all _n_ types? The key insight is to decompose into geometric phases: after collecting _i_ types, the wait for a new one is Geometric with success probability (n-i)/n.

**Recognition:**

- "Collect all", "see every type", "complete the set"
- The process naturally breaks into phases with decreasing success probabilities
- The answer involves harmonic numbers: E[T] = nHₙ ≈ n ln n
- Often combined with linearity of expectation and indicator variables

**Canonical Problems:**

- Standard coupon collector: E[time to collect all *n* types] = nHₙ
- Variance of the coupon collector time → n²π²/6 (approx)
- Double coupon collector: expected time to get every type at least _twice_
- You need 5 specific cards from a 10-card set. Packs contain 1 random card. Expected packs to buy?
- Coupon collector with unequal probabilities (general case)
- At what point have you collected half the coupon types in expectation?

---

### 14. Random Walks (incl. Gambler's Ruin)

**Definition:** A sequence of random steps on the integers (or a graph). At each step, move +1 with probability p or -1 with probability 1-p. Gambler's Ruin is the classic absorption problem: starting at _k_, what is P(reach _n_ before 0)?

**Recognition:**

- Sequential process with +1/-1 (or similar) steps
- Questions about reaching a boundary, returning to origin, or time to absorption
- The problem has a Markov structure with absorbing barriers
- Reflection principle can simplify counting paths
- Keywords: "walk", "gamble", "ruin", "reach", "return"

**Canonical Problems:**

- Symmetric random walk: P(return to origin) = 1 in 1D, but < 1 in 3D+
- Gambler's ruin: P(reach _n_ starting from _k_) = k/n (fair game) or (1-(q/p)^k)/(1-(q/p)^n)
- Expected duration of gambler's ruin (fair case): k(n-k)
- Ballot problem: candidate A gets _a_ votes, B gets _b_ votes (a > b). P(A leads throughout)? → (a-b)/(a+b)
- Reflection principle: number of paths from (0,0) to (n,k) that touch zero
- A drunk starts at position 0. After _n_ steps, what is E[|position|]?

---

## 🔹 STOCHASTIC PROCESSES

### 15. Markov Chains

**Definition:** A discrete-time stochastic process where the future depends only on the current state, not the history (memoryless property). Fully described by a transition matrix P. Key computations: stationary distribution, absorption probabilities, expected hitting times.

**Recognition:**

- The problem describes a system that transitions between states based on current state only
- "At each step, with probability p go to state A, otherwise go to state B"
- You need long-run behavior, expected first passage time, or absorption probability
- The system can be described by a transition matrix

**Canonical Problems:**

- Rainy/sunny weather chain: P(rain tomorrow | rain today) = 0.7, P(rain | sunny) = 0.3. Find the stationary distribution
- Ehrenfest diffusion model: _n_ particles in two boxes, one moves randomly each step
- Expected number of steps to go from state _i_ to state _j_ in a given chain
- Absorbing chain: 3 states, 2 absorbing. Starting from transient state, P(absorbed into state A)?
- Branching process: each individual has Poisson(λ) offspring. P(extinction)?
- Google PageRank as a Markov chain — compute the stationary vector

---

### 16. Poisson Process

**Definition:** A continuous-time counting process where events arrive at constant rate λ, inter-arrival times are i.i.d. Exponential(λ), and non-overlapping intervals are independent. The continuous-time analog of "Bernoulli trials."

**Recognition:**

- Events arrive "at random" over continuous time at a fixed rate
- You see "λ events per unit time" or "exponential inter-arrival times"
- Merging, splitting, or thinning of arrival streams
- Conditioning on the total count in an interval

**Canonical Problems:**

- Customers arrive at rate 5/hour. What is P(> 3 arrivals in 30 min)?
- Two Poisson processes with rates λ₁, λ₂. What is P(first arrival is from process 1)? → λ₁/(λ₁+λ₂)
- Given N(t)=n, the arrival times are distributed as order statistics of Uniform(0,t)
- Thinning: each arrival is type A with probability p. Type A arrivals form Poisson(λp)
- Competing exponentials: min(X₁,...,Xₙ) ~ Exponential(λ₁+...+λₙ)
- Expected time until both process 1 and process 2 have had at least one arrival

---

### 17. Brownian Motion

**Definition:** A continuous-time, continuous-path stochastic process B(t) with independent Gaussian increments: B(t)-B(s) ~ N(0, t-s). The scaling limit of random walks. Foundation of quantitative finance.

**Recognition:**

- Continuous-time random movement, stock prices, diffusion
- The problem involves Gaussian increments, scaling properties, or hitting times
- Connection to stochastic calculus, Black-Scholes, or heat equation
- "Standard Brownian motion" or "Wiener process"

**Canonical Problems:**

- B(t) is standard BM. What is E[B(t)²]? → t. What is Var(B(s) + B(t)) for s < t?
- What is P(B(1) > 0 | B(2) = 0)? (Brownian bridge)
- Expected first hitting time of level _a_: E[T_a] = ∞ for standard BM
- P(max\_{0≤s≤t} B(s) > a) via reflection principle → 2P(B(t) > a)
- Geometric Brownian motion: S(t) = S(0)exp((μ-σ²/2)t + σB(t)). What is E[S(t)]?
- Is B(t)² a martingale? (No. B(t)² - t is.)

---

### 18. Martingales

**Definition:** A stochastic process M(t) where E[M(t+1)|M(0),...,M(t)] = M(t) — the best prediction of the future value is the current value ("fair game"). The Optional Stopping Theorem lets you evaluate expectations at random stopping times.

**Recognition:**

- A process that is "fair" — no drift, no expected gain
- You need to compute P(reaching A before B) or E[stopping time]
- Transform a process into a martingale to extract information (e.g., X² - n for random walk)
- Gambling strategies, fair betting, or "can you beat the system?" questions

**Canonical Problems:**

- Show that the simple random walk S_n is a martingale
- Show that S_n² - n is a martingale. Use it to find E[T] for gambler's ruin
- A gambler doubles their bet after each loss (martingale strategy). What goes wrong?
- Polya's urn: start with 1 red, 1 blue. Draw one, replace with 2 of same color. Show fraction of red is a martingale
- Use Optional Stopping to find P(reach +a before -b) for simple random walk → b/(a+b)
- Is |B(t)| a martingale? (No. Is it a submartingale? Yes.)

---

## 🔹 ADVANCED TOOLS

### 19. Moment Generating Functions (MGF)

**Definition:** M_X(t) = E[e^{tX}]. If it exists in a neighborhood of 0, it uniquely determines the distribution and provides a fast way to compute moments: E[Xⁿ] = M^(n)(0). The key power: the MGF of a sum of independent RVs is the product of their MGFs.

**Recognition:**

- You need the distribution of a sum of independent random variables
- The problem asks to identify a distribution from its moments
- You need to prove that X converges in distribution to Y (match MGFs)
- Computing higher moments (variance, skewness) from a known distribution

**Canonical Problems:**

- Derive the MGF of Poisson(λ). Use it to show that the sum of independent Poissons is Poisson
- Prove that the sum of independent Normals is Normal using MGFs
- X₁,...,Xₙ i.i.d. Exponential(λ). Show that X₁+...+Xₙ ~ Gamma(n,λ) via MGF
- Use the MGF of Binomial to compute E[X(X-1)] and derive Var(X)
- Find the MGF of X² where X ~ N(0,1) and identify the resulting distribution (χ²)

---

### 20. Order Statistics

**Definition:** Given i.i.d. samples X₁,...,Xₙ, the order statistics X₍₁₎ ≤ X₍₂₎ ≤ ... ≤ X₍ₙ₎ are the sorted values. The k-th order statistic X₍ₖ₎ has a known density involving the CDF and PDF of the original distribution. Min = X₍₁₎, Max = X₍ₙ₎, Median = X₍⌈n/2⌉₎.

**Recognition:**

- Questions about the minimum, maximum, or k-th smallest of a sample
- "What is the distribution of the largest/smallest observation?"
- Spacing between consecutive order statistics
- Connection to Beta distribution for Uniform order statistics

**Canonical Problems:**

- X₁,...,Xₙ i.i.d. Uniform(0,1). What is E[max]? → n/(n+1). What is E[min]? → 1/(n+1)
- The k-th order statistic of Uniform(0,1) has distribution Beta(k, n-k+1). Verify for k=1 and k=n
- X₁,...,Xₙ i.i.d. Exponential(λ). What is the distribution of X₍₁₎? → Exponential(nλ)
- Expected range E[X₍ₙ₎ - X₍₁₎] for Uniform(0,1) samples → (n-1)/(n+1)
- Spacings: Dᵢ = X₍ᵢ₎ - X₍ᵢ₋₁₎ for Uniform order stats. Show they are NOT i.i.d. but have a known distribution
- You interview _n_ candidates sequentially (secretary problem). What is the optimal strategy?

---

## 🔹 STATS / ML

### 21. MLE / MAP

**Definition:** Maximum Likelihood Estimation finds the parameter θ that maximizes P(data|θ). MAP (Maximum A Posteriori) adds a prior: θ_MAP = argmax P(data|θ)·P(θ). MLE is the frequentist workhorse; MAP is the Bayesian point estimate.

**Recognition:**

- "Estimate the parameter given the data"
- You need to write the likelihood function and maximize it (often via log-likelihood)
- MAP appears when a prior/regularization is mentioned
- Connection: MAP with uniform prior = MLE; MAP with Gaussian prior = L2-regularized MLE

**Canonical Problems:**

- MLE for λ in Poisson(λ) given n observations → λ̂ = x̄
- MLE for p in Binomial(n,p) given k successes → p̂ = k/n
- MLE for μ and σ² in Normal(μ,σ²) → show that σ̂² is biased
- MAP estimate for p in Binomial with Beta(α,β) prior → (k+α-1)/(n+α+β-2)
- Derive the MLE for a Uniform(0,θ) distribution → θ̂ = max(xᵢ). Is it biased?
- Show that ridge regression is MAP with Gaussian prior on weights

---

### 22. Hypothesis Testing

**Definition:** A framework for deciding between two hypotheses using data. H₀ (null) is the default; H₁ (alternative) is what we want to detect. Control Type I error (false positive) at level α, then maximize power (1 - Type II error).

**Recognition:**

- "Is this result statistically significant?"
- "Test whether μ = μ₀" or "test whether treatment has an effect"
- You need to compute a test statistic and compare to a threshold
- p-value, significance level, power, or sample size determination

**Canonical Problems:**

- Z-test: test H₀: μ = 100 vs H₁: μ ≠ 100 with n=25 observations and known σ
- What is the p-value if your test statistic is z = 2.3 in a two-sided test?
- Compute the power of a test: P(reject H₀ | H₁ is true with μ = μ₁)
- How large does n need to be to detect a difference of δ with power 0.8?
- A/B test: 1000 users in each group, conversion rates 5.2% vs 4.8%. Is the difference significant?
- Multiple testing: you run 20 tests at α=0.05. What is P(at least one false positive)? How does Bonferroni correction help?

---

### 23. Bayesian Inference

**Definition:** Update beliefs using Bayes' rule: Posterior ∝ Likelihood × Prior. Unlike frequentist methods, Bayesian inference treats parameters as random variables and produces a full posterior distribution, not just point estimates.

**Recognition:**

- You're given a prior distribution on a parameter
- The problem asks "what do you believe about θ after seeing the data?"
- Conjugate priors make the posterior easy to compute (same family as prior)
- Credible intervals, posterior predictive, or model comparison

**Canonical Problems:**

- Beta-Binomial conjugacy: prior Beta(α,β), observe k heads in n flips → posterior Beta(α+k, β+n-k)
- Normal-Normal conjugacy: prior N(μ₀,σ₀²), data N(θ,σ²) → posterior is Normal (derive it)
- Compute a 95% credible interval for a proportion given data and Beta prior
- Posterior predictive: given the posterior on p, what is P(next flip = H)?
- Compare two models using Bayes factors: which model better explains the data?
- Uninformative priors: what happens as the prior becomes flat? (connection to MLE)

---

### 24. Bias-Variance Tradeoff

**Definition:** For any estimator, the expected prediction error decomposes as Error = Bias² + Variance + Irreducible Noise. Complex models have low bias but high variance (overfitting); simple models have high bias but low variance (underfitting). The sweet spot minimizes total error.

**Recognition:**

- Model selection or complexity questions in ML interviews
- "Why does my model overfit / underfit?"
- "What is the effect of adding regularization?"
- Questions about training error vs. test error, or the U-shaped test error curve

**Canonical Problems:**

- Derive the bias-variance decomposition for squared error: E[(Y-f̂(x))²] = Bias²(f̂) + Var(f̂) + σ²
- Is the sample mean an unbiased estimator of μ? What is its variance?
- Compare bias and variance of k-NN for k=1 vs k=n
- How does λ in ridge regression affect the bias-variance tradeoff?
- Cross-validation: why does leave-one-out CV have high variance compared to 10-fold CV?
- Double descent phenomenon: why can test error decrease again past the interpolation threshold?

---

## Quick Reference: Pattern Selection Guide

| You see...                                  | Try this pattern                      |
| ------------------------------------------- | ------------------------------------- |
| "How many ways..."                          | Counting & Combinatorics              |
| "Given that... what is P(...)?"             | Conditional Prob & Bayes              |
| "Expected number of..." (sum decomposition) | Linearity of Expectation + Indicators |
| "Expected value given..." (staged info)     | Conditional Expectation               |
| "Until you see all / collect all"           | Coupon Collector                      |
| "Walk / gamble / reach before..."           | Random Walks + First-Step Analysis    |
| "By symmetry all positions equivalent"      | Symmetry & Exchangeability            |
| "Throw m balls into n bins"                 | Balls & Bins                          |
| "Transitions between states"                | Markov Chains                         |
| "Arrivals at rate λ"                        | Poisson Process                       |
| "Distribution of the max / min"             | Order Statistics                      |
| "Estimate the parameter"                    | MLE / MAP                             |
| "Is the difference significant?"            | Hypothesis Testing                    |
| "Update belief with data"                   | Bayesian Inference                    |
| "Overfitting vs underfitting"               | Bias-Variance                         |

---

<p align="center"><strong>ProbaCode — Master Probability, Ace the Interview</strong></p>
