<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [How to Contribute to Quarksuite](#how-to-contribute-to-quarksuite)
  - [Introduction](#introduction)
  - [Contributions Welcome](#contributions-welcome)
  - [Caveats](#caveats)
  - [Ground Rules](#ground-rules)
  - [How to Report a Bug](#how-to-report-a-bug)
  - [Review Schedule](#review-schedule)
  - [Code Style](#code-style)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# How to Contribute to Quarksuite

*I'm still really new to maintaining open source projects. I won't attempt to write my own contribution guidelines from scratch. Instead these guidelines are lifted in part from @nayafia's [contributing template](https://github.com/nayafia/contributing-template).*

## Introduction

First, I want to thank you. Both for your interest in this project and in improving it.

Following these guidelines will go a long way toward helping me to help you. Whether it's with usage issues, bug triage, or assessing and completing pull requests.

## Contributions Welcome

I focus a lot on improving the core of this project, and while I stay on top of the documentation, something is bound to escape my notice. If you want to write tutorials, examples, improve the existing docs, or even share some of the cool ways you use this project, I absolutely welcome that.

If you're an experienced functional programmer with suggestions on improving the source code, or willing to point out where I overdid it, I'd definitely appreciate your help. I'm still learning my way through this very project, which explains its rapid release schedule up through v3.

## Caveats

Some contributions will be accepted or rejected on a case-by-case basis.

I'm not currently looking for feature requests as I have a solid idea of this library's intended features and architecture. Unless it's something the community demands and shows that it would improve the experience and workflow.

Especially important to me is keeping the size of the library ~3-5KB (minified and gzipped). Any changes that jump this threshold, unless they demonstrate they well justify the exception, will not be considered.

Any changes that fall outside any of the [project's other objectives][project obj] will also not be considered.

None of the above is really a hard rejection. I'm just asking that you put a little more thought into why they would be necessary changes.

## Ground Rules

I understand that it's frustrating when software breaks, but open source maintainers&mdash;whether me or someone else&mdash;are not the real source of your ire. Nor are other members of the community who may try to help you.

Your issue is the problem. Respond accordingly.

Failing that, I have a [Code of Conduct][COC] under active enforcement. And please don't hesitate to call out when my own behavior as a project maintainer sets a bad example. It's there for my words and actions as well.

## How to Report a Bug

Solving your issue will go much smoother if you follow this outline:

+ Information about your environment (OS, Node version/browser)
+ What you expected would happen
+ What actually happened
+ The error thrown by your console, if any
+ The code that caused the issue, if applicable
+ What you've already tried to resolve your issue

## Review Schedule

I usually check out the project for issues and pull requests on a weekly basis. Honestly, I'm not on the internet that much anymore, but I'll try to get to your bugs and contributions as quickly as I can. If it seems to be taking a while, you can email me at: crjr.code@gmail.com and give me a nudge.

## Code Style

This project uses standard Prettier formatting and recommended ESLint TypeScript settings. These are checked before each commit.

[project obj]: https://github.com/quarksuite/core/blob/master/README.md#project-objectives
[COC]: https://github.com/quarksuite/core/blob/master/CODE_OF_CONDUCT.md
