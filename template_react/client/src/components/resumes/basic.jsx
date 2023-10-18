import { Document, View, StyleSheet, Page } from "@react-pdf/renderer";
import Heading from "../resumeComponents/Heading.jsx";
import Watermark from "../resumeComponents/Watermark.jsx";
import Section from "../resumeComponents/Section.jsx";
import { WorkPost } from "../resumeComponents/WorkPost";
import { ListItem } from "../resumeComponents/ListItem.jsx";
import { Resume } from "../resumeComponents/Resume.jsx";
import { EducationPost } from "../resumeComponents/Education.jsx";
import { Insight } from "../resumeComponents/Skills.jsx";
const styles = StyleSheet.create({
  page: {
    paddingTop: 48,
    paddingHorizontal: 50,
  },
  row: {
    flexDirection: "row",
  },
  leftColumn: {
    flexGrow: 1,
    marginRight: 16,
    width: "55%",
    marginBottom: 15
  },
  rightColumn: {
    flexGrow: 1,
    width: "40%",
  },
});

function BasicResume({ techProfile, techResume }) {
  console.log(techProfile);
  
  return (
    <Document
      title={`${techProfile.name} - ${techResume.title}`}
      author={techProfile.name}
      // keywords={techResume.keywords}
    >
      <Page size="A4" style={styles.page}>
        <Watermark />
        <Heading
          title={techProfile.name}
          subtitle={techResume.title}
          avatarUrl={techResume.avatarUrl}
          information={{
            phone: techProfile.phone,
            email: techProfile.email,
            website: techProfile.website,
            location: techProfile.location,
          }}
        />
        <View style={styles.row}>
          <View style={styles.leftColumn}>
            <Section title={["Work Experience"]} spacing={8}>
              {techResume.workExperiences.map((workExperience) => (
                <WorkPost
                  key={workExperience.id}
                  title={workExperience.jobTitle}
                  companyName={workExperience.employer}
                  companyUrl={workExperience.companyUrl || ""}
                  location={workExperience.city}
                  description={workExperience.description}
                  dateRange={workExperience.dateRange}
                >
                  {workExperience.lines
                    ?.split("\n")
                    .filter(Boolean)
                    .map((line, i) => (
                      <ListItem key={`${workExperience.id}-line-${i}`}>
                        {line}
                      </ListItem>
                    ))}
                </WorkPost>
              ))}
            </Section>
          </View>
          <View style={styles.rightColumn}>
            <Section title={"Professional Summary"} spacing={8}>
              <Resume>{techResume.aboutMe}</Resume>
            </Section>
            <Section title={["Education"]} spacing={8}>
              {techResume.educationExperiences.map((educationExperience) => (
                <EducationPost
                  key={educationExperience.id}
                  title={educationExperience.degree}
                  almaMater={educationExperience.school}
                  dateRange={educationExperience.dateRange}
                  startAt={educationExperience.startAt}
                  endAt={educationExperience.endAt}
                  location={educationExperience.schoolCity}
                >
                  {/* {educationExperience.lines
                    .split("\n")
                    .filter(Boolean)
                    .map((line, i) => (
                      <ListItem key={`${educationExperience.id}-line-${i}`}>
                        {line}
                      </ListItem>
                    ))} */}
                </EducationPost>
              ))}
            </Section>
            {/* <Section title={s["title.lang"]} spacing={12}>
              {techResume.langSkills.map((langSkill) => (
                <Language
                  key={langSkill.id}
                  name={langSkill.name}
                  scoreLabel={langSkill.scoreLabel}
                  score={langSkill.score}
                />
              ))}
            </Section> */}
            <Section title={["skills"]} spacing={12}>
              {techResume.skills.map((skill, index) => {
              return ( <Insight
                  key={index}
                  title={skill.focus || skill.Focus}
                  description={skill.value || skill.Value}
                  iconName={skill.icon}
                />)
              })}
            </Section>
            {/* <Section title={s["title.findMe"]} spacing={0}>
              <View style={{ flexDirection: "row" }}>
                <SocialMedia
                  name="Twitter"
                  profileUrl={techProfile.twitter}
                  style={{ flex: 1 }}
                />
                <SocialMedia
                  name="Github"
                  profileUrl={techProfile.github}
                  style={{ flex: 1 }}
                />
                <SocialMedia
                  name="LinkedIn"
                  profileUrl={techProfile.linkedin}
                  style={{ flex: 1 }}
                />
              </View>
            </Section> */}
          </View>
        </View>
      </Page>
      {/* {techResume.workProjects?.length ? (
        <Page size="A4" style={styles.page}>
          <Watermark />
          <View style={styles.row}>
            <View style={styles.leftColumn}>
              <Section title={s["title.projects"]} spacing={8}>
                {techResume.workProjects?.map((workProject) => (
                  <WorkPost
                    key={workProject.id}
                    title={workProject.title}
                    location={workProject.location}
                    companyName={workProject.company}
                    startAt={workProject.startAt}
                    endAt={workProject.endAt}
                    description={workProject.description}
                  >
                    {workProject.lines
                      ?.split("\n")
                      .filter(Boolean)
                      .map((line, i) => (
                        <ListItem key={`${workProject.id}-line-${i}`}>
                          {line}
                        </ListItem>
                      ))}
                  </WorkPost>
                ))}
              </Section>
            </View>
            <View style={styles.rightColumn}>
              <Section title={s["title.tech"]} spacing={8}>
                {techResume.techGroups?.map((techGroup) => (
                  <TechGroup
                    key={techGroup.id}
                    title={techGroup.title}
                    tags={techGroup.tags}
                  />
                ))}
              </Section>
            </View>
          </View>
        </Page>
      ) : null} */}
    </Document>
  );
}

export default BasicResume;
