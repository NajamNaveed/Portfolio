import Reveal from "./Reveal.jsx";
import SectionShell from "./SectionShell.jsx";
import SafeImage from "../ui/SafeImage.jsx";

const groupByCategory = (skills) => {
  const categories = new Set(skills.map((skill) => (skill.category || "").trim()).filter(Boolean));

  // Only group when the CMS data actually differentiates categories -
  // don't invent a grouping the backend doesn't support.
  if (categories.size < 2) {
    return [{ category: null, items: skills }];
  }

  const groups = new Map();
  skills.forEach((skill) => {
    const key = (skill.category || "").trim() || "Other";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(skill);
  });

  return Array.from(groups.entries()).map(([category, items]) => ({ category, items }));
};

const SkillCard = ({ skill }) => (
  <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
    <div className="flex items-center justify-between gap-2">
      <div className="flex min-w-0 items-center gap-2">
        {skill.icon && (
          <SafeImage src={skill.icon} alt="" className="h-5 w-5 flex-shrink-0 rounded object-contain" />
        )}
        <span className="truncate text-sm font-medium text-slate-100">{skill.name}</span>
      </div>
      {typeof skill.proficiency === "number" && skill.proficiency > 0 && (
        <span className="flex-shrink-0 text-xs text-slate-500">{skill.proficiency}%</span>
      )}
    </div>
    {skill.description && <p className="mt-1 text-xs text-slate-500">{skill.description}</p>}
    {typeof skill.proficiency === "number" && skill.proficiency > 0 && (
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-indigo-500"
          style={{ width: `${Math.min(Math.max(skill.proficiency, 0), 100)}%` }}
        />
      </div>
    )}
  </div>
);

const SkillsSection = ({ skills }) => {
  if (!skills || skills.length === 0) return null;

  const sorted = skills.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const groups = groupByCategory(sorted);

  return (
    <SectionShell id="skills" eyebrow="What I work with" title="Skills">
      <div className="space-y-10">
        {groups.map((group, groupIndex) => (
          <div key={group.category || "all"}>
            {group.category && (
              <Reveal delay={groupIndex * 0.05}>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-indigo-400">
                  {group.category}
                </h3>
              </Reveal>
            )}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((skill, index) => (
                <Reveal key={skill._id || skill.name} delay={groupIndex * 0.05 + index * 0.03}>
                  <SkillCard skill={skill} />
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
};

export default SkillsSection;
