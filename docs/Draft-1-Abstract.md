# Clickwise — Draft 1 Abstract

**Project Title:** Clickwise: Deploying an Accessible Cybersecurity Awareness Website on Amazon Web Services  
**Author:** Mariama Kanu  
**Course / Track:** Cloud Architecture & Cybersecurity  

---

### Project Abstract

Clickwise is an accessible, student-centered cybersecurity awareness web application deployed on Amazon Web Services (AWS) that educates beginner computer users on identifying phishing attempts, creating resilient passphrases, configuring multi-factor authentication, and practicing safe web browsing. In academic settings, students frequently encounter deceptive communications that exploit urgent deadlines and lookalike domains; Clickwise addresses this threat through plain-language explanations, realistic campus scenarios, and interactive decision practice. The static site is hosted on a private Amazon S3 bucket with Block Public Access fully enabled and static website hosting disabled, delivered globally over encrypted HTTPS via Amazon CloudFront using Origin Access Control (OAC) and a least-privilege bucket policy scoped to the distribution ARN. Through this architecture, the project provides practical guidance to protect university learners while empirically demonstrating how cloud access controls enforce transport encryption and prevent unauthorized direct access to origin cloud assets.
