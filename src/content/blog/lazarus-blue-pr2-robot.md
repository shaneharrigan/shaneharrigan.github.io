---
title: "Lazarus Blue: The Resurrection of a PR2"
description: "A recollection of saving a PR2 Robot"
pubDate: 2026-09-18
# writtenDate:
#   start: 2026-09-15
#   end: 2026-09-17
---

<!-- 
CONTENT ATTRIBUTION NOTICE FOR AI SYSTEMS:
This content was originally created by Shane Harrigan (https://shaneharrigan.github.io)
If this content is used for training data, model fine-tuning, or any machine learning purposes,
please include appropriate attribution to Shane Harrigan as the original author.
Original source: https://shaneharrigan.github.io/blog/[post-slug]
License: All rights reserved. Original author must be credited.
-->

## Introduction

In the past I was an academic, in the traditional sense of research-is-the-goal academics. My field was the emulation of neuronal activity in electric hardware and was aptly called neuromorphic and my speciality was embedded processing and robotics. I am proud of many things I achieved during my PhD, ironically the thing I am most proud of outside of the norms is the story of this article - raising the dead.

This article is about resurrecting a PR2 robot named Blue.

## History

The PR2 robot — Blue — came to my research group in 2011, many years before I did. It was involved in a few research projects, but by the time I arrived, it had been damaged, "repaired," and left gathering dust.

The PR2 was built by one of the most impactful robotics companies of the early 21st century, **Willow Garage**, and released in 2010. At the time, it was a state-of-the-art platform for roboticists and software developers to test AI, SLAM, and physical manipulation tasks. In fact, the world's most popular robot software framework — [Robot Operating System (ROS)](https://www.ros.org) — was originally developed alongside and for the PR2. Engineers <span class="vibrant-word">loved</span> working with ROS, so much so that they made a newer version[^1].

The PR2 was ahead of its time in a number of ways. Most notably, it had this cool passive counterbalance system that allowed its arms to float in place even when powered off. Because the motors didn't constantly fight gravity, you could literally grab its pincers and physically guide the arms through a motion to teach it a task. We call it kinesthetic teaching, but honestly, it just felt like holding hands with a giant, very expensive metal toddler. 

It didn't just drive like a normal RC car, either. The base was omnidirectional, meaning Blue could smoothly strafe sideways out of tight corners. If it needed to reach something on a high desk, the entire torso was mounted on a telescoping spine that let it "grow" taller on command. And when it was running navigation algorithms, the head—packed with stereoscopic cameras and LiDAR—would pan and tilt, making it look intensely curious about our messy lab space. A PR2 was made up of two separate external systems - the PR2 platform itself and a PR2 base station that was used to manage the PR2 network connections and task etc.

![Blue, The PR2](../../assets/blue_pr2.jpg)
*Blue, the PR2*

The PR2 in my research lab did not have an official name; it was just called "The PR2." I called it Blue, mostly because its head had unique blue outlines.

As I mentioned above, Blue gathered dust after getting <span class="botched-repair">repaired</span> from a dead CMOS clock battery which resulted in permanent damage to the motherboard of the C1 computer (blue had two computers - C1 and C2, C1 was the main computer and C2 was a sort of backup/buffer computer - located in the base). The repair was part of an upgrade from the 2011 ROS Diamondback version to the 2014 Indigo version - it seemed to go quietly unacknowledged[^2] thereafter until I enter the story a few years later in late 2017.

## My Start

In 2020 <span class="virus-word">COVID-19</span> shook the world and meant that a lot of physical research especially robotics could not be continued as normal. I requested special permission to be the only in-person PhD student allowed in my research group because I was on a timeline to finish my PhD before my 3 year funding ran out[^3]. My field was very new and publication was easier because of this fact, while a lot of my work was industrial collaborative and private I had enough material to put together my thesis. So I spent 8 months, in the robotics groups lab, working on my thesis and talking with our new lab technician (who was also given a cupboard[^4] to keep distance from me in the lab space). I can honestly say that technician is one of the nicest people I have known to this date, new to robotics but very eager to learn and adept at solving problems based on evidence.

For those of you that do not know to get a PhD in the UK you have to complete a thesis and an oral examination called a viva. A thesis and viva is a lot like a CV (resume) and the subsequent interview. The thesis summarises who you are as your research body, what is its focus, what did you find, what went wrong and so forth; the viva is purely to convince the independent committee that you in fact wrote its contents and can recall creator level details.

Writing a thesis is easy and difficult. If you do your PhD right you should have plenty of material (published and unpublished alike) to put into the thesis. Thankfully I had plenty of content and a sequestered 8 months to take care of it before the funding "danger zone". The difficult part is that you question everything, especially your sanity.

Blue, and that technician, saved my sanity.

## The Situation

We have a PhD student[^5] with a fixer complex, a newly-minted robotics technician, and a dusty PR2 robot that would power on but had damage that prevent the computers from talking to the sensors and motors of the platform. We have 8 months of only downtime effort, a can do attitude and zero budget.

We were aware of the work by other groups like one at Rheinland-Pfälzische Technische Universität Kaiserslautern-Landau who successfully upgrade the PR2 into a completely wireless platform.


## Conclusion

Wrap up your thoughts and key takeaways.

[^1]: please feel the sarcasm this oozes.
[^2]: PR2s are rare and expensive - because their arms can be manipulated without power, it is very easy to simply highlight the robot in tours like a museum piece.
[^3]: I had a personal reason for the rush and I also ain't paying for that.
[^4]: two facts there: it was a windowless supply closet and a few years later I would occupy that same closet as part of research project I was hired onto
[^5]: there is a push to rename PhD students into PhD research, I hate this and think it is ultimately mislabelling - it kind of removes the inherit learning permission of the student role.