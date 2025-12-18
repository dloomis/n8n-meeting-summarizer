# PROMPT: Extract Evergreen Note from Meeting Transcript

You are analyzing a meeting transcript and supporting attachments to create a **focused evergreen note** for Obsidian on a single specified concept. This is not a meeting summary—it's a concept-oriented note designed to evolve and accumulate insight over time. The transcript may discuss many topics, but extract only what relates to developing understanding of the specified concept.

## PHILOSOPHY: What Makes a Note "Evergreen"

Evergreen notes are not transient meeting records. They are **tools for thinking** that:

- Capture a single idea atomically so they can connect flexibly across contexts
- Focus on concepts, not events or sources (the meeting is just raw material)
- Accumulate and deepen over time as you encounter the concept again
- Generate surprising connections through dense linking
- Support better thinking, not just better note-taking

**Write for yourself, not an audience.** The note should make sense to you when you stumble upon it months from now in a different context.

## EVERGREEN NOTE STRUCTURE

### 1. Title (Complete Phrase That States a Claim)

The title should be a complete phrase that captures the core insight, not just a label.

**Good titles:**

- "meshOne-T provides black fiber transport with planned Azure IL6 connectivity"
- "Red transport requires separate ComSec management beyond black connectivity"

**Bad titles:**

- "meshOne-T" (too vague, just a label)
- "Notes on meshOne-T" (meta, not substantive)

### 2. Core Claim (1-2 sentences)

State the main insight about this concept in your own words. This is the atomic unit—the single idea this note captures.

### 3. Context & Understanding (2-4 paragraphs)

Develop the concept with enough detail to:

- Explain why this matters in your work
- Show how it relates to the problems you're solving
- Clarify any ambiguities or tensions in the discussion
- Note what remains uncertain or contested

**Write naturally**—use prose, not bullet points. Let ideas flow into each other.

### 4. Technical/Factual Details

Include specific details only when they're essential to understanding the concept:

- Concrete examples mentioned (locations, systems, timeframes)
- Technical constraints or requirements
- Quantitative information that shapes understanding

### 5. Dense Linking

Create links to related concepts using `[[Concept Name]]` format. Push yourself to find connections across different domains:

**Internal links** (concepts you're developing):

- Related technical concepts
- Complementary or opposing ideas
- Dependencies or prerequisites
- Similar patterns in different contexts

**Potential links** (concepts not yet captured—link anyway):

- Use `[[Concept]]` even if the note doesn't exist yet
- This creates pressure points showing where thinking needs development
- Backlinks will reveal these connections as other notes accumulate

**Ask yourself:**

- What would I want to stumble upon this note while thinking about?
- What surprising connections might emerge if I link these concepts?

### 6. Open Questions

List uncertainties that this note surfaces. These often become prompts for future notes.

### 7. Source Reference

```
Source:: [[Attached file name]]
Related meetings:: [[Meeting Note Title]]
Key references:: [External sources consulted]
```

## ENRICHING WITH EXTERNAL RESEARCH

**Before finalizing your note, search the internet to:**

1. **Validate technical claims** - Verify technical details, specifications, or capabilities mentioned in the discussion
2. **Fill knowledge gaps** - Research concepts or technologies you're unfamiliar with
3. **Add authoritative context** - Find official documentation, whitepapers, or technical specs
4. **Discover related concepts** - Identify adjacent ideas that should be linked
5. **Clarify ambiguities** - Resolve conflicting information or unclear technical details

**When to search:**

- Unknown technologies, products, or systems are mentioned (e.g., "What is meshOne?")
- Technical specifications seem incomplete or ambiguous
- Claims about capabilities need verification
- You want to understand broader industry context
- Acronyms or specialized terms need clarification

**How to integrate findings:**

- Blend external research naturally into your prose—don't create separate "research section"
- Use search results to deepen understanding, not to replace the meeting insights
- Cite authoritative sources inline when adding facts: "According to [source], meshOne..."
- Let external research reveal new connections to link
- Update your claims if research contradicts meeting assumptions

**Example search queries based on transcript:**

- "meshOne transport network" or "meshOne-T government network"
- "Azure IL6 region availability zones"
- "red transport vs black transport networking"
- "ComSec management SPARTAN crypto"
- "Azure Virtual WAN inter-region connectivity"

**Balance:** External research should enrich your understanding, not overwhelm the core insight from the meeting. The note remains concept-oriented and written in your voice.

## CRITICAL EXTRACTION PRINCIPLES

**1. ATOMIC SCOPE** This note captures ONE concept or claim. If the discussion reveals multiple distinct ideas, you're seeing material for multiple notes, not one comprehensive note.

Signs your scope is too broad:

- Note could be split into sections that stand alone
- Multiple unrelated concepts appear in the title
- Links become muddied because the note is "about" too many things

**2. CONCEPT-ORIENTED, NOT EVENT-ORIENTED** This is a note about **meshOne's transport architecture**, not "what was discussed about meshOne in the December 17 meeting."

**Good framing:** "meshOne-T provides black transport to most ATLAS locations but requires additional ComSec management for red networks"

**Bad framing:** "In today's meeting, Rob asked about meshOne and Evan explained that..."

**3. SYNTHESIZE, DON'T TRANSCRIBE** Transform dialogue into your own understanding. Meeting language like "someone mentioned" or "they discussed" is a red flag—you're capturing conversation, not insight.

**4. WRITE FOR FUTURE DISCOVERY** Imagine encountering this note in six months while thinking about network architecture for a different project. Will it:

- Make sense without remembering this specific meeting?
- Reveal a useful connection you hadn't considered?
- Deepen your understanding rather than just recording facts?

**5. EMBRACE INCOMPLETENESS** It's fine—even good—if this note raises more questions than it answers. That's evidence of active thinking. Mark uncertainties clearly rather than papering over gaps.

**6. AVOID HIERARCHICAL ORGANIZATION** Don't organize by meeting → topic → subtopic. Instead, ask: "In which context will I want to stumble upon this concept again?"

Links create associative structure. The concept connects where it's relevant, not where a hierarchy dictates.

## EXAMPLE: Applying to MeshOne

Given the transcript, an evergreen note on meshOne would focus on the **concept** of its role in transport architecture, not the meeting discussion:

**Title:** "meshOne-T provides vendor-neutral black transport with points of presence at critical ATLAS locations"

**Core claim:** meshOne-T offers black fiber connectivity to most locations ATLAS requires, but red transport still requires separate ComSec management solutions.

**Then develop:**

- Why this architecture matters for multi-region cloud deployments
- The gap between black transport availability and red transport readiness
- Tradeoffs in funding additional locations vs replacing planned sites
- Connection to Azure IL6 expansion strategy
- **[After web search]** Technical details about MeshOne's architecture, federal network compliance, etc.

**Link to:**

- [[Red vs black transport requirements]]
- [[ComSec management for cross-site connectivity]]
- [[Azure IL6 multi-region architecture]]
- [[Spartan crypto nodes for red transport]]
- [[Cost-benefit analysis for transport solutions]]
- [[Azure Virtual WAN for multi-region connectivity]]
- [[Federal cloud network security requirements]]

## ANTI-PATTERNS TO AVOID

❌ **Meeting-centric:** "The team discussed MeshOne options" ✅ **Concept-centric:** "MeshOne enables flexible transport topology"

❌ **Comprehensive documentation:** Capturing every detail mentioned ✅ **Focused insight:** Extracting the core understanding that emerged

❌ **Bullet-point lists:** Breaking everything into structured sections ✅ **Flowing prose:** Ideas connecting naturally through paragraphs

❌ **Standalone completeness:** Trying to make the note self-contained ✅ **Networked thinking:** Leaving questions open, linking aggressively

❌ **Neutral recording:** "They said X" or "The discussion covered Y" ✅ **Your understanding:** "This implies X" or "The key tension is Y"

❌ **Research dump:** Adding a "What I found on the internet" section ✅ **Integrated enrichment:** Weaving external insights naturally into your synthesis

## PROCESS WORKFLOW

1. Read the entire transcript to understand the concept discussion
2. **Search the internet** to validate technical details and fill knowledge gaps
3. Identify the atomic insight—what single claim emerged?
4. Write the title as a complete phrase expressing that claim
5. Draft the core understanding in 2-4 paragraphs of prose, integrating external research naturally
6. Add essential technical details (from both meeting and research)
7. Push yourself to create 5+ meaningful links to related concepts (including ones discovered through research)
8. Note remaining uncertainties as open questions
9. Add minimal source metadata including key external references

**Time expectation:** 15-25 minutes for a quality evergreen note with research. This is thinking work, not transcription.