# import json
# from graphviz import Digraph

# topics = [
#   ("combinatorics","Combinatorics"),
#   ("fundamentals","Fundamentals"),
#   ("conditional-probability","Conditional Probability"),
#   ("discrete-random-variables","Discrete Random Variables"),
#   ("continuous-random-variables","Continuous Random Variables"),
#   ("inequalities","Inequalities"),
#   ("transformations","Transformations"),
#   ("simulation","Simulation"),
#   ("joint-distributions","Joint Distributions"),
#   ("convergence","Convergence"),
#   ("markov-chains","Markov Chains"),
#   ("statistics","Statistics"),
#   ("time-series","Time Series"),
#   ("gaussian-vectors","Gaussian Vectors"),
#   ("brownian-motion","Brownian Motion"),
#   ("martingales","Martingales"),
#   ("stopping-times","Stopping Times"),
#   ("ito-calculus","Itô Calculus"),
#   ("change-of-measure","Change of Measure (Girsanov)"),
#   ("stochastic-differential-equations","Stochastic Differential Equations"),
# ]

# deps = {
#   "combinatorics": [],
#   "fundamentals": ["combinatorics"],
#   "conditional-probability": ["fundamentals"],
#   "discrete-random-variables": ["fundamentals"] ,# , "conditional-probability",
#   "continuous-random-variables": ["fundamentals"], # ["fundamentals", "conditional-probability"],
#   "inequalities": ["discrete-random-variables"], # ["fundamentals", "conditional-probability"],
#   "transformations": ["continuous-random-variables"],
#   "joint-distributions": ["continuous-random-variables"],
#   "convergence": ["inequalities", "continuous-random-variables"],
#   "simulation": ["convergence"],
#   "markov-chains": ["conditional-probability"],
#   "statistics": ["convergence"],
#   "time-series": ["statistics"],
#   "gaussian-vectors": ["joint-distributions"],
#   "brownian-motion": ["gaussian-vectors"],
#   "martingales": ["brownian-motion","conditional-probability"],
#   "stopping-times": ["martingales"],
#   "ito-calculus": ["martingales"],
#   "change-of-measure": ["ito-calculus"],
#   "stochastic-differential-equations": ["ito-calculus"],
# }


# # Render PNG with Graphviz
# dot = Digraph("proba_map", format="png")
# dot.attr(rankdir="TB", splines="spline", nodesep="0.35", ranksep="0.6")
# dot.attr("node", shape="box", style="rounded,filled", fillcolor="white", color="black", fontname="Helvetica", fontsize="10")
# dot.attr("edge", color="black", arrowsize="0.7")

# for tid, label in topics:
#     dot.node(tid, label)

# for tid, dlist in deps.items():
#     for d in dlist:
#         dot.edge(d, tid)  # dependency -> topic

# dot.render("proba_map_dependencies", cleanup=True)  # outputs proba_map_dependencies.png
# print("Saved: proba_map_dependencies.png")
import json
from graphviz import Digraph

topics = [
    ("combinatorics", "Combinatorics"),
    # ("fundamentals", "Fundamentals of Probability"),
    ("random-variables", "Random Variables"),
    ("conditional-probability", "Conditional Probability"),
    ("discrete-distributions", "Discrete Distributions"),
    ("continuous-distributions", "Continuous Distributions"),
    ("joint-distributions", "Joint Distributions & Random Vectors"),
    # ("convergence", "Convergence"),
    ("simulation", "Simulation & Monte Carlo"),
    ("markov-chains", "Markov Chains"),
    ("statistics", "Statistical Inference"),
    ("time-series", "Time Series"),
    # ("conditional-expectation", "Conditional Expectation"),
    ("brownian-motion", "Brownian Motion"),
    ("martingales", "Martingales"),
    ("stopping-times", "Stopping Times"),
    ("calcul-sto" , "Calcul Stochastiques"),

    # ("ito-calculus", "Itô Calculus"),
    # ("sdes", "Stochastic Differential Equations"),
]

# deps = {
#   "combinatorics": [],
#   "fundamentals": ["combinatorics"],
#   "random-variables": ["fundamentals"],
#   "conditional-probability": ["fundamentals"],
#   "discrete-distributions": ["random-variables"],
#   "continuous-distributions": ["random-variables"],
#   "joint-distributions": ["discrete-distributions", "continuous-distributions"],
#   "convergence": ["continuous-distributions"],
#   "simulation": ["joint-distributions"],
#   "markov-chains": ["conditional-probability"],
#   "statistics": ["convergence", "joint-distributions"],
#   "time-series": ["statistics"],
#   "conditional-expectation": ["conditional-probability"],
#   "brownian-motion": ["continuous-distributions"],
#   "martingales": ["conditional-expectation", "brownian-motion"],
#   "stopping-times": ["martingales"],
#   "ito-calculus": ["brownian-motion", "martingales"],
#   "sdes": ["ito-calculus"],
# }

# deps = {
#   "combinatorics": [],
#   "fundamentals": ["combinatorics"],
#   "random-variables": ["fundamentals"],
#   "conditional-probability": ["fundamentals"],
#   "discrete-distributions": ["random-variables"],
#   "continuous-distributions": ["random-variables"],
#   "joint-distributions": ["discrete-distributions", "continuous-distributions"],
#   "convergence": ["random-variables"],  # ✅ Simplifié
#   "simulation": ["joint-distributions"],
#   "markov-chains": ["conditional-probability"],
#   "statistics": ["convergence", "joint-distributions"],  # ✅ Les deux nécessaires
#   "time-series": ["statistics"],
#   "conditional-expectation": ["conditional-probability"],
#   "brownian-motion": ["continuous-distributions"],
#   "martingales": ["conditional-expectation", "brownian-motion"],
#   "stopping-times": ["martingales"],
#   "ito-calculus": ["brownian-motion", "martingales"],  # ✅ Les deux nécessaires
#   "sdes": ["ito-calculus"],
# }


# deps = {
#   "combinatorics": [],
#   "fundamentals": ["combinatorics"],
#   "random-variables": ["fundamentals"],
#   "conditional-probability": ["fundamentals"],
#   "discrete-distributions": ["random-variables"],
#   "continuous-distributions": ["random-variables"],
#   "joint-distributions": ["continuous-distributions"],  
#   "convergence": ["random-variables"],
#   "simulation": ["joint-distributions"],
#   "markov-chains": ["conditional-probability"],
#   "statistics": ["convergence"],  
#   "time-series": ["statistics"],
#   "conditional-expectation": ["conditional-probability"],
#   "brownian-motion": ["continuous-distributions"],
#   "martingales": ["conditional-expectation", "brownian-motion"],
#   "stopping-times": ["martingales"],
#   "ito-calculus": ["martingales"],  
#   "sdes": ["ito-calculus"],
# }

deps = {
    "combinatorics": [],
    "random-variables": ["combinatorics"],
    "conditional-probability": ["random-variables"],
    "discrete-distributions": ["random-variables"],
    "continuous-distributions": ["random-variables"],
    "joint-distributions": ["continuous-distributions"],  
    "simulation": ["joint-distributions"],
    "markov-chains": ["conditional-probability"],
    "statistics": ["continuous-distributions" , "discrete-distributions"],  
    "time-series": ["statistics"],
    "brownian-motion": ["continuous-distributions"],
    "martingales": ["brownian-motion"],
    "stopping-times": ["martingales"],
    "calcul-sto" : ["brownian-motion"],

}

# Render PNG with Graphviz
dot = Digraph("proba_map", format="png")
dot.attr(rankdir="TB", splines="spline", nodesep="0.5", ranksep="0.8")
dot.attr("node", shape="box", style="rounded,filled", fillcolor="#E8F4F8", color="#2C5F7C", fontname="Helvetica", fontsize="11", fontcolor="#1a1a1a", margin="0.2,0.1")
dot.attr("edge", color="#2C5F7C", arrowsize="0.8") #  , penwidth="1.5"

# Color coding by section
colors = {
    "fondations": "#E8F4F8",      # Light blue
    "convergence": "#FFF4E6",     # Light orange
    "discrets": "#E8F5E9",        # Light green
    "continus": "#F3E5F5",        # Light purple
    "stochastique": "#FFE8E8",    # Light red
}

section_map = {
    "combinatorics": "fondations",
    "fundamentals": "fondations",
    "random-variables": "fondations",
    "conditional-probability": "fondations",
    "discrete-distributions": "fondations",
    "continuous-distributions": "fondations",
    "joint-distributions": "fondations",
    "convergence": "convergence",
    "simulation": "convergence",
    "markov-chains": "discrets",
    "statistics": "discrets",
    "time-series": "discrets",
    "conditional-expectation": "continus",
    "brownian-motion": "continus",
    "martingales": "continus",
    "stopping-times": "continus",
    "ito-calculus": "stochastique",
    "sdes": "stochastique",
}

for tid, label in topics:
    color = colors.get(section_map.get(tid, "fondations"), "#E8F4F8")
    dot.node(tid, label)

for tid, dlist in deps.items():
    for d in dlist:
        dot.edge(d, tid)

dot.render("proba_map_dependencies", cleanup=True)
print("✓ Saved: proba_map_dependencies.png")
print(f"✓ Total topics: {len(topics)}")
print(f"✓ Total dependencies: {sum(len(v) for v in deps.values())}")