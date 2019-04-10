---
title: New Beginnings
date: "2019-03-09T22:40:32.169Z"
description: Lambda Labs's Jorge Osto's Journey!.
---

This will be an overview of my journey in my first experience with Lambda Labs, I will try to cover all important actions I took individually and all team related actions as well. This is a living document, so if I remember later something new I'll keep adding stuffs here from time to time.

## Planning out our App

When we were approved our Team and assigned the app we wanted to work on, at that point we have discussed a lot about our app is goal. Who is gonna be our audience, what kind of features they will more likely need, etc... so we had a bit of advantage on this. So our main focused was the stack we were using to acomplish this goal. We as team decided that our main goal is to get out of labs with a good portfolio piece where we can showcase our skills to future employers, an this brought to the topic that the best way to do this was by using new technologies that we weren't taught at Lambda School. So this brought the following ideas to the table:

- React or Angular?
- Mobile apps?
- UI Framework
- Node.js and express Backend or Java Backend?
- Relational Database or non-Relational Database?

During this discussion phase I could realize that some team mebers weren't too convinced about all those new stack, and I could understand their thoughts so even when I was about to try everything new I had to slow down a bit and find some balance between new stack and known stack, mainly because they were right about one thing, **This is a time sensitive project** and if we run into any issues we don't have the expertise to debug the problem as we would have in debugging known issues and if we want to finish a high quality product on time we can't take too many risks. This was the first big lesson to me about working in a team, that my opinion is not the only valueble one and is not the one that matters most, the team will always come first, and this prepared me for the next days.

At the end of this discussion we agreed to split the team in 2 groups, backend and frontend, I ended up in the backend team, mainly because there we will be implementing new stack and I was eager to learn and willing to accept the challenge. We decided the stack we will finally be using.

- React: Because the heavy work will be on front end and this will allow us as a team to move faster in order to meet milestones and have some time left to work on some stretch goals that we decided to go for.
- IOS & Android apps: Joseph and I accepted this challenge, because we wanted to learn react-native and because we thought it would be a good way to showcase what we were able to acomplish. We decided to work on this on our own time without affecting our time working with the team in the main app.
- Material UI as the front end components library: This will help us to prototype the app faster and have some goodlooking components following the Material Design idea that Google proposes.
- Node.js & Express Backend & GraphQL: We decided that learning Java in so short timeframe wouldn't be wise, We decided to add GraphQL to the ecuation because we thought it would save us time and add a lot of flexibility, also its a new tech for us that is widely used in the industry.
- non-Relational Database(MongoDB and mongoose): We decided that MongoDB would fit better in the way we wanted to structure our data and will play really well with GraphQL, also it was something that all backend group members wanted to learn so we went for it. We also decided to deploy our back end to AWS.

### Some challenges I had to overcome

After we decided the stack we will use, that left me with the challenge of learning the new stacks I will have to work with, so I spent the first 2 days learning React Native while we were working on the TDD. After that I spent the next 3 days studying GraphQL and MongoDB, and at the same time we as a team were planing the data modeling for our backend app. 5 days were gone and we havent written a single line of code so even when I felt stil a bit confused about GraphQL and MongoDB, I went ahead and started the barebones of our Express App and step by step connecting the basic boilerplate to get  created an account on MongoDB Atlas, created a database there and then connected it to the Express App.

> At this point the team was able to start working on different tasks. The file structure was clear and everything was ready to go.
> I had to take care of the Company Model, GraphQL types and resolvers. 
> While working on one of the resolvers i realized we needed some dynamism in this ones, 
> so I started by creating one resolver that take data dinamically on the flight and this was my first big acomplishment.
> When I got it working i realized that this would be useful for my teammates in their own schemas and resolvers 
> if they just changed some variables and the context where they would use it so i thought in sharing my function with them
> After I told them so, I realized that if i write that function in a way they can reuse it just passing those variables as arguments that would be even
> easier and cleaner, since we can reuse this functions in other places of the project.
> I was able to get this function reusable and then went ahead and implemented all my others resolvers in the same way,
> so they can use my functions in their own resolvers and this way i was saving some time to the team
> While doing this I came with the idea of building all this functions in a way that I can reuse them also in other projects
> In order to get this done I had to spent a lot of time reading Mongoose Docs and researching in deep its functionalities and core concepts,
> how they handle some process under the hood. After some hours I was able to acomplish what I see so far
> as my biggest acomplishment in this project. My helpers function can be used on any project by anyone
> and that brought me the idea of probably write my own npm package with these resolvers and some others that have come to my mind.

Besides these challenges other struggles I have had has been merge conflicts with github, I have ran into a couple of these and it's been good learning experiences, its new to most of us so we are learning together how to deal with them.

### Lambda School Labs Sprint 2

During this second Sprint our focus needed to be getting working all APIs and Authentication. I decided to work on Authentication using passport.js strategies and let my teammates working on the existing GraphQL queries and mutations, as well as schemas. I started implementing Google, then moved onto Facebook, then we thought Stripe might be useful for our app and finally worked on a local strategy based on JWT, all using passport.js strategies. When I first looked at the docs I thought that the harder part would be getting the first one working and then all the others would be pretty much the same thing but I couldn't be more wrong about it, I found different challenges on each one of them and spent way more time than expected on this. By the end of the fist week I was done with my first mission....'Authentication'. Working with passport was something that I was looking forward to learn and I got it, so I was happy with my work, eventhough I knew It wasn't complete, because we needed a lot of info from front end before we can complete all the logic, but the barebones were done and working.

After this I decided to work on the payment process with the Stripe API, I had heard it was difficult and challenging so i definitely wanted to be the one working on it, so I started researching about it and eventually I got it done, but we still need to connect it with the front end, but I did learn a lot during this second week, about payments, security issues, handling sensitive data, and best practices asociated with all of this.

At the end of this Sprint I feel like our backend Team is pretty solid and we are getting closer to each other, I had a lot of support from my teammates and often times I got help from them. I'm geting a really good experience of working with a team and also i feel like I'm getting some good friends in the processs. Looking forward for new challenges on Sprint 3 and the opportunity of working closer with the front end Team.

### Lambda School Labs Sprint 3

This was for sure a very Challenging Sprint. We had to overcome different challenges, the bigger of them losing a teammate who got hired, while I'm very happy for him it had a negative effect in the team and left a lot of work and doubtsin the team, but we overcome that with a lot of extra hours and comunication between us. 

At some point I had to jump to the front end to work in the Billings page which involved the Stripe work I did in the backend, so working through the frontend files was quite challenging, I found lots of useless components and methods writen for no reason, and the file structure, well, that was the cherry on the top for me, it was really hard to find a component, where it was written, where it was being used, and stuffs like that. I was also in the middle of some personal issues that attempted against my time to work on the project so at the end of the week I had to put lots of hours to catch up and give the team what it needed.

So, this was a challenging Sprint but full of learing experiences and opportunities to get used to what it feels like to work in the real world. Looking forward for next challenges.

When she reached the first hills of the Italic Mountains, she had a last view
back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet
Village and the subline of her own road, the Line Lane. Pityful a rethoric
question ran over her cheek, then she continued her way. On her way she met a
copy.

> The copy warned the Little Blind Text, that where it came from it would have
> been rewritten a thousand times and everything that was left from its origin
> would be the word "and" and the Little Blind Text should turn around and
> return to its own, safe country.

But nothing the copy said could convince her and so it didn’t take long until a
few insidious Copy Writers ambushed her, made her drunk with Longe and Parole
and dragged her into their agency, where they abused her for their projects
again and again. And if she hasn’t been rewritten, then they are still using
her. Far far away, behind the word mountains, far from the countries Vokalia and
Consonantia, there live the blind texts.

#### Silent delightfully including because before one up barring chameleon

Separated they live in Bookmarksgrove right at the coast of the Semantics, a
large language ocean. A small river named Duden flows by their place and
supplies it with the necessary regelialia. It is a paradisematic country, in
which roasted parts of sentences fly into your mouth.

Even the all-powerful Pointing has no control about the blind texts it is an
almost unorthographic life One day however a small line of blind text by the
name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox
advised her not to do so, because there were thousands of bad Commas, wild
Question Marks and devious Semikoli, but the Little Blind Text didn’t listen.

##### Wherever far wow thus a squirrel raccoon jeez jaguar this from along

She packed her seven versalia, put her initial into the belt and made herself on
the way. When she reached the first hills of the Italic Mountains, she had a
last view back on the skyline of her hometown Bookmarksgrove, the headline of
Alphabet Village and the subline of her own road, the Line Lane. Pityful a
rethoric question ran over her cheek, then she continued her way. On her way she
met a copy.

###### Slapped cozy a that lightheartedly and far

The copy warned the Little Blind Text, that where it came from it would have
been rewritten a thousand times and everything that was left from its origin
would be the word "and" and the Little Blind Text should turn around and return
to its own, safe country. But nothing the copy said could convince her and so it
didn’t take long until a few insidious Copy Writers ambushed her, made her drunk
with Longe and Parole and dragged her into their agency, where they abused her
for their projects again and again.
