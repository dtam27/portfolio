function invalidContent() {
  const error = new Error("Invalid coursework content.");
  error.code = "INVALID_CONTENT";
  return error;
}

function object(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw invalidContent();
}

function text(value, max = 2000) {
  if (typeof value !== "string" || !value.length || value.length > max) throw invalidContent();
}

/** The builder and browser accept the same bounded, text-only content structure. */
export function validateCourseworkPayload(payload) {
  object(payload);
  if (payload.version !== 1 || !Array.isArray(payload.courses) || !payload.courses.length || payload.courses.length > 20) {
    throw invalidContent();
  }
  text(payload.intro);
  for (const course of payload.courses) {
    object(course);
    text(course.code, 40);
    text(course.title, 200);
    text(course.summary);
    if (!Array.isArray(course.projects) || !course.projects.length || course.projects.length > 20) throw invalidContent();
    for (const project of course.projects) {
      object(project);
      text(project.title, 200);
      text(project.summary);
      if (!Array.isArray(project.points) || project.points.length > 8 || !Array.isArray(project.technologies) || project.technologies.length > 12) throw invalidContent();
      project.points.forEach((point) => text(point));
      project.technologies.forEach((technology) => text(technology, 80));
      if (project.note) text(project.note);
      if (!Array.isArray(project.files) || project.files.length > 20) throw invalidContent();
      for (const file of project.files) {
        object(file);
        text(file.name, 120);
        if (!/^[\w. -]+$/.test(file.name)) throw invalidContent();
        text(file.content, 1_000_000);
      }
    }
  }
  return payload;
}
