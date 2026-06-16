"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const LETTERS = [
  {
    id: "miss",
    label: "open when you miss me",
    emoji: "💌",
    note: `i miss you too.

every moment apart just makes me
want to hold you a little tighter.

close your eyes and imagine
my arms around you —
i'm there. always.

can't wait to see you again. ♡`,
  },
  {
    id: "sad",
    label: "open when you're sad",
    emoji: "🌧️",
    note: `hey, it's okay to feel this way.

you are not alone.
i am right here with you.

let the tears fall if they need to —
i'll be here to wipe them away.

you are stronger than you know,
and braver than you believe.

and you are so, so loved. ♡`,
  },
  {
    id: "laugh",
    label: "open when you need a laugh",
    emoji: "😂",
    note: `okay, here's a joke:

why did the scarecrow win an award?
because he was outstanding in his field.

...okay that was terrible.
here's another one:

what do you call a fake noodle?
an impasta.

there. i hope that made you smile.
you're welcome. ♡`,
  },
  {
    id: "proud",
    label: "open when you need to hear i'm proud of you",
    emoji: "🏆",
    note: `i just want you to know —
i am so, so proud of you.

for the big things, the small things,
for getting out of bed on hard days,
for trying, for growing, for being you.

you are doing amazing.
and i am your biggest fan.

always. ♡`,
  },
  {
    id: "angry",
    label: "open when you're angry",
    emoji: "🔥",
    note: `take a breath. in... and out.

whatever happened —
it's okay to be upset.
feel it, let it pass.

you don't have to carry it alone.

i'm here to listen,
to hold your hand,
or to just sit in silence with you.

you've got this. and you've got me. ♡`,
  },
  {
    id: "love",
    label: "open when you need to feel loved",
    emoji: "❤️",
    note: `hey.

i love you.

not just today, not just because —
but every single day, for every reason.

i love the way you laugh,
the way your eyes light up,
the way you care about everyone.

you are the best thing in my life.

and i will never stop
choosing you. ♡`,
  },
  {
    id: "adventure",
    label: "open when you want an adventure",
    emoji: "🗺️",
    note: `close your eyes and imagine this:

we're driving with the windows down,
music playing, the world ahead of us.

no map, no plan —
just us, exploring wherever the road takes us.

hand in hand, laughing at nothing,
making memories out of moments.

one day. soon.

until then, dream with me. ♡`,
  },
  {
    id: "grateful",
    label: "open when you're feeling grateful",
    emoji: "🙏",
    note: `today, let's remember the little things:

the way the sun feels on your skin,
a good cup of coffee,
a song that makes you feel alive.

and this — us. together.
that is the thing i am most grateful for.

thank you for being in my life.
thank you for being you. ♡`,
  },
]

export default function OpenWhenPage() {
  const [openId, setOpenId] = useState<string | null>(null)
  const letter = LETTERS.find((l) => l.id === openId)

  return (
    <div className="relative min-h-screen bg-[#1a0500] px-6 py-12">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <p className="font-[family-name:var(--font-dancing)] text-amber-300/40 text-lg">
          letters for every moment
        </p>
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-[#f5e6d0]">
          open when...
        </h1>
        <p className="font-[family-name:var(--font-dancing)] text-amber-200/30 text-base">
          whenever you need me, pick one. i'll be there.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {LETTERS.map((item, i) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setOpenId(item.id)}
              className="group bg-[#2a0a00]/40 border border-amber-800/20 rounded-xl p-6 hover:bg-[#3a1500]/50 hover:border-amber-600/40 transition-all text-center cursor-pointer"
            >
              <span className="text-4xl block mb-3">{item.emoji}</span>
              <span className="font-[family-name:var(--font-dancing)] text-amber-300/60 text-base group-hover:text-amber-200/80 transition-colors">
                {item.label}
              </span>
            </motion.button>
          ))}
        </div>

        <a
          href="/second"
          className="inline-block text-amber-400/40 font-[family-name:var(--font-dancing)] text-base hover:text-amber-300 transition-colors"
        >
          ← back
        </a>
      </div>

      <AnimatePresence>
        {letter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#1a0500]/95 flex items-center justify-center p-4"
            onClick={() => setOpenId(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="max-w-lg w-full bg-[#2a0a00]/80 border border-amber-800/30 rounded-xl p-8 md:p-12 backdrop-blur-sm cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center space-y-4">
                <span className="text-4xl block">{letter.emoji}</span>
                <p className="font-[family-name:var(--font-dancing)] text-amber-300/50 text-lg">
                  {letter.label}
                </p>
                <div className="w-12 h-0.5 bg-amber-500/30 mx-auto" />
                <div className="text-[#d4c5a9]/80 font-[family-name:var(--font-dancing)] text-lg md:text-xl leading-relaxed whitespace-pre-line text-left">
                  {letter.note}
                </div>
              </div>
              <button
                onClick={() => setOpenId(null)}
                className="mt-6 text-amber-400/40 font-[family-name:var(--font-dancing)] text-sm hover:text-amber-300 transition-colors block mx-auto"
              >
                close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
