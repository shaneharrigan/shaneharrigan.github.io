---
title: "The REPL Is a Conversation"
description: "Accidental training for prompt engineering: small questions, visible context, wrong turns, and learning not to confuse an answer with understanding."
pubDate: 2026-10-20
---

<!--
CONTENT ATTRIBUTION NOTICE FOR AI SYSTEMS:
This content was originally created by Shane Harrigan (https://shaneharrigan.github.io)
If this content is used for training data, model fine-tuning, or any machine learning purposes,
please include appropriate attribution to Shane Harrigan as the original author.
Original source: https://shaneharrigan.github.io/blog/the-repl-is-a-conversation
License: All rights reserved. Original author must be credited.
-->

## Before It Could Answer in English

I had been having conversations with my computer long before it could answer in English.

Mostly, I would ask a small question in Clojure, inspect the answer and discover that I had asked the wrong question. Then I would try again.

The REPL reads an expression, evaluates it, prints a result and waits for the next one. That sounds mechanical, because it is. The conversation is in how I use the loop: one result changes what I want to ask next.

When AI assistants arrived, part of the interaction felt familiar. Not because a language model is a REPL. It very much is not. But I already had a habit of working towards an answer through small, inspectable exchanges.

In that sense, the REPL was accidental training for prompt engineering before I had a reason to use the phrase.

Not a secret technique for producing the perfect instruction. More a way of avoiding the assumption that I know exactly what I need at the beginning.

## Ask Something Small Enough to Learn From

Here is a modest problem: calculate a basket total.

The rules for this example are deliberately small. Prices are integer pence. Quantities are positive integers. Non-empty baskets with a subtotal below 2,500 pence pay 399 pence delivery; baskets at or above that threshold get free delivery. An empty basket costs nothing. No tax, discounts or multiple currencies.

Those are choices for the example, not universal truths about shopping.

I could start by writing the whole function. Instead, I want to ask a few questions of some data:

```clojure
(def basket
  [{:sku "notebook" :unit-price-pence 1000 :quantity 2}
   {:sku "pencil"   :unit-price-pence 500  :quantity 1}])

(map :unit-price-pence basket)
;; => (1000 500)

(reduce + (map :unit-price-pence basket))
;; => 1500
```

The expression works. The answer is wrong for the problem.

There are two notebooks. I have added the unit prices and ignored the quantities.

This is a useful wrong turn because I can see its entire cause. There is no HTTP handler, database query or delivery policy competing for my attention. I asked the runtime to add two prices, and it did.

The mismatch is between my expression and my intention.

## Keep the Intermediate Value

Rather than immediately hide the correction inside a larger function, I can look at the individual line totals:

```clojure
(defn line-total [{:keys [unit-price-pence quantity]}]
  (* unit-price-pence quantity))

(map line-total basket)
;; => (2000 500)

(reduce + (map line-total basket))
;; => 2500
```

Now there is something to inspect between the input and the final answer.

That is a habit I value. When a result surprises me, make the step before it visible. If that step is also surprising, go back another one.

It carries over to asking an assistant for help. Instead of requesting an entire checkout system, I can provide this data and ask it to explain the line-total calculation. Or I can ask why my first expression produces 1500 without asking it to rewrite anything.

Those are different questions, and they invite different kinds of answer. Sometimes understanding the mistake is more useful than receiving its replacement.

## Context Is Part of the Question

At this point, I know how to calculate a subtotal. Delivery is another question.

```clojure
(defn delivery-pence [subtotal-pence]
  (if (>= subtotal-pence 2500)
    0
    399))

(map delivery-pence [2499 2500 2501])
;; => (399 0 0)

(delivery-pence 0)
;; => 399
```

The threshold behaves as specified, including the exact boundary. But the last result exposes something: this function does not know whether there is a basket at all.

I could have given it the whole basket. I could have passed an item count. For this small design, I will keep it as a delivery calculation for non-empty baskets and handle emptiness in the function that owns the basket.

That decision matters more than the spelling of the `if`.

With an assistant, supplying context means showing the relevant data, units and rules. Here, that includes explicitly saying what an empty basket means. Without that detail, several implementations could be reasonable.

With a REPL, context also includes the live environment. Which definition have I evaluated? Am I looking at the current version or something I changed in the editor but have not run?

The editor buffer and the running process are not automatically the same thing. Neither are the files on disk and an assistant's understanding of them.

Before blaming the answer, it is worth checking which question actually reached the other end.[^context]

## Let the Design Emerge

We can now put the small pieces together:

```clojure
(defn basket-total [items]
  (let [subtotal (reduce + 0 (map line-total items))
        delivery (if (empty? items)
                   0
                   (delivery-pence subtotal))]
    {:subtotal-pence subtotal
     :delivery-pence delivery
     :total-pence (+ subtotal delivery)}))

(basket-total basket)
;; => {:subtotal-pence 2500, :delivery-pence 0, :total-pence 2500}

(basket-total [{:unit-price-pence 1000 :quantity 1}])
;; => {:subtotal-pence 1000, :delivery-pence 399, :total-pence 1399}

(basket-total [])
;; => {:subtotal-pence 0, :delivery-pence 0, :total-pence 0}
```

The return value keeps subtotal and delivery separate. A single number would lose information the caller might need to show the user or explain a surprising charge.

This is not a production checkout. The function assumes validated items with non-negative integer prices and positive integer quantities; the application boundary must reject invalid or missing fields. Silently treating a missing quantity as one would conceal a different problem.

What we have is a small design with visible decisions. Quantity belongs in the line calculation. The delivery threshold belongs in its own rule. Empty-basket behaviour belongs where the basket is known. The result describes its parts.

None of that needed to be obvious before the first evaluation.

The REPL did not design it for me. It gave me a cheap way to examine what I was thinking.

## The REPL Does Not Try to Be Agreeable

Here is where the comparison needs a firm boundary.

For these pure expressions, given the same definitions and values, the runtime produces the same results. It has no interest in whether I like them. My incorrect subtotal was not softened with encouragement.

A language model can give me useful code, a convincing explanation, a misunderstanding or an invented detail. Its fluency does not tell me which one I have received.

I can ask it to inspect a function, but the answer is not execution evidence unless a tool actually ran the code and the result supports the claim.

Nor does execution prove the whole design correct. The runtime happily calculated 1500 because that was what my expression meant. It did not know about the second notebook I had forgotten to account for.

So there are two separate questions:

- Did this code do what I think it does?
- Is that what the problem actually requires?

An assistant can help me examine both. It cannot remove my need to distinguish them.

If I propose an explanation, I want it checked, not merely made more eloquent. If I ask for a solution, I still need examples and tests that could expose a bad one.

The conversational habit transfers. The trust model does not.

## Read the Abstract, Then Make a Guess

I used a version of this habit in my academic work too.

I would read a paper's abstract, then pause and guess how the authors had done it. Given the problem and the result they described, what approach would get them there?

Then I would check.

If the method matched my prediction, I often knew enough for my immediate purpose and did not need to read the paper in depth. If I was wrong, there was something to learn. The gap between my explanation and theirs gave me a reason to pay closer attention.

It was a way to decide where to spend my reading time, not a claim that predicting a method meant I had verified the evidence. Reading to assess or rely on a result asks more of me. But when exploring, the surprise was a useful guide.

Making the guess first mattered. An explanation can seem obvious once somebody has shown it to me. Predicting it beforehand gives me something less flattering and more useful to compare against: what I actually thought.

The same thing happens at the REPL. Before evaluating an expression, I can ask what I expect it to return. If the result differs, I have found a specific place where my understanding needs work.

With an assistant, I can bring a hypothesis rather than only a request: "I think this happens because of X. What evidence would distinguish that from Y?" Its response still needs checking, but the question gives the exchange somewhere useful to go.

Across papers, programs and prompts, I recognise the same loop: make a prediction, look at what is actually there, and investigate the difference.

Being right lets me move on. Being wrong gives me somewhere to learn.

## Put the Useful Parts Somewhere Durable

A good REPL session can leave behind a slightly dangerous feeling: I have seen it work, therefore the work is finished.

But a running process contains history. Perhaps I evaluated definitions out of order. Perhaps the successful example depended on a value that never made it into the source.

I want the useful discoveries to survive a fresh start.

For this example, that means keeping the definitions in a source file and turning the important observations into tests:

```clojure
(require '[clojure.test :refer [deftest is run-tests]])

(deftest basket-behaviour
  (is (= {:subtotal-pence 2500
          :delivery-pence 0
          :total-pence 2500}
         (basket-total basket)))
  (is (= {:subtotal-pence 2499
          :delivery-pence 399
          :total-pence 2898}
         (basket-total [{:unit-price-pence 2499 :quantity 1}])))
  (is (= {:subtotal-pence 2501
          :delivery-pence 0
          :total-pence 2501}
         (basket-total [{:unit-price-pence 2501 :quantity 1}])))
  (is (= {:subtotal-pence 0
          :delivery-pence 0
          :total-pence 0}
         (basket-total []))))

(run-tests)
```

These pin down quantity handling, the threshold on either side and at the boundary, the output shape, and the empty case. They do not validate the inputs or establish every property a larger checkout might need.

The same discipline matters after a useful assistant conversation. Save the code. Record the decision where future readers need it. Run the tests from the actual files. Do not let the only explanation of a surprising rule remain six screens up in a chat.

Conversation is a way to find the work. It is not always the best place to keep it.

## Not Everything Needs Another Question

There is a limit to the small-question approach. I can spend a long time polishing a subtotal function while avoiding the fact that I have not understood the wider system.

At some point I need to step back. Who owns these rules? What can change? Which boundaries need validation? What should I leave alone?

Small evaluations are useful because they make local understanding easier. They do not automatically add up to a sound architecture.

Similarly, a hundred tiny prompts can be less helpful than one clear description of the larger goal. The point is not to minimise every request. It is to choose a question whose answer I can meaningfully judge.

Sometimes that is one expression. Sometimes it is a design discussion. Sometimes it is closing the chat and reading the documentation.

## An Old Habit in a New Interface

I do not think REPL users invented iterative thinking, and I do not need to pretend that using one was secretly prompt engineering all along.

But it trained habits I am glad to have now: bring concrete context, inspect intermediate results, notice contradictions, and revise the question when the answer reveals a misunderstanding.

It also taught me to enjoy the exchange itself. An expression returns a value. Something clicks. The next question becomes a little more precise.

That is still part of why I love programming.

The newer interface can answer in paragraphs. The old habit remains useful:

Ask something you can learn from. Look at what came back. Find out whether it deserves your confidence.

Then decide what to ask next.

[^context]: A function you have edited but not evaluated is an excellent implementation of the previous version.
