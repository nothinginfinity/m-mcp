# Glossary

## Worker

A deterministic multi-step transformer that converts raw or semi-structured input into structured output.

## Tool adapter

A bounded callable action that performs an operation and returns typed output.

## Context envelope

The standardized container used to pass typed data between capabilities.

## Capability

A registered worker or tool that can be executed by the runtime.

## Registry

The in-memory directory of available capabilities.

## Orchestrator

The bounded runtime executor that selects and runs capabilities.

## Policy

A reusable rule that affects whether execution is allowed, preferred, or should escalate.

## Trace

A structured record of execution activity and outcome.

## Escalation

A recommendation to hand uncertain or high-risk output to another capability or review path.
