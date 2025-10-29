import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const SKILLS_POOL = [
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Python',
  'Django',
  'Flask',
  'Java',
  'Spring Boot',
  'Go',
  'Rust',
  'PHP',
  'Laravel',
  'Ruby',
  'Rails',
  'Vue.js',
  'Angular',
  'Svelte',
  'HTML',
  'CSS',
  'Tailwind CSS',
  'SCSS',
  'MongoDB',
  'PostgreSQL',
  'MySQL',
  'Redis',
  'GraphQL',
  'REST API',
  'Docker',
  'Kubernetes',
  'AWS',
  'Azure',
  'GCP',
  'CI/CD',
  'Git',
  'UI/UX Design',
  'Figma',
  'Adobe XD',
  'Photoshop',
  'Illustrator',
  'Product Management',
  'Agile',
  'Scrum',
  'Test-Driven Development',
  'Jest',
  'Cypress',
  'Playwright',
  'Machine Learning',
  'TensorFlow',
  'PyTorch',
  'Data Science',
  'SQL',
  'NoSQL',
];

function getRandomSkills(min: number = 3, max: number = 8): string[] {
  const count = faker.number.int({ min, max });
  const shuffled = [...SKILLS_POOL].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  console.log('🗑️  Clearing existing data...');
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();

  // Create 20 fake users with profiles
  const userCount = 20;
  console.log(`👥 Creating ${userCount} users with profiles...`);

  const hashedPassword = await bcrypt.hash('password123', 10);

  for (let i = 0; i < userCount; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const username = faker.internet.username({ firstName, lastName }).toLowerCase();
    const email = faker.internet.email({ firstName, lastName }).toLowerCase();

    // Use DiceBear Avatars API - generates consistent avatars based on username
    const avatarStyle = faker.helpers.arrayElement([
      'avataaars',
      'bottts',
      'identicon',
      'initials',
      'lorelei',
      'personas',
      'pixel-art',
    ]);
    const profileImageUrl = `https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${username}`;

    try {
      const user = await prisma.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
          profile: {
            create: {
              name: `${firstName} ${lastName}`,
              bio: faker.helpers.arrayElement([
                faker.person.bio(),
                faker.company.catchPhrase(),
                `${faker.hacker.phrase()} | ${faker.company.buzzPhrase()}`,
                `Passionate about ${faker.hacker.adjective()} ${faker.hacker.noun()}. ${faker.company.catchPhrase()}.`,
                null, // Some users might not have a bio
              ]),
              profileImageUrl,
              skills: JSON.stringify(getRandomSkills()),
            },
          },
        },
        include: {
          profile: true,
        },
      });

      console.log(`✅ Created user: ${user.username} (${user.email})`);
    } catch (error) {
      console.log(`⚠️  Skipped duplicate: ${username} or ${email}`);
    }
  }

  // Create a test user with known credentials
  console.log('\n🧪 Creating test user...');
  try {
    const testUser = await prisma.user.create({
      data: {
        email: 'test@example.com',
        username: 'testuser',
        password: hashedPassword,
        profile: {
          create: {
            name: 'Test User',
            bio: 'This is a test account for development purposes. Password: password123',
            profileImageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=testuser',
            skills: JSON.stringify([
              'JavaScript',
              'TypeScript',
              'React',
              'Next.js',
              'Node.js',
              'PostgreSQL',
              'Docker',
              'AWS',
            ]),
          },
        },
      },
      include: {
        profile: true,
      },
    });

    console.log(`✅ Test user created: ${testUser.username} (${testUser.email})`);
    console.log('   Password: password123');
  } catch (error) {
    console.log('⚠️  Test user already exists');
  }

  const totalUsers = await prisma.user.count();
  const totalProfiles = await prisma.profile.count();

  console.log('\n✨ Seed completed successfully!');
  console.log(`📊 Total users: ${totalUsers}`);
  console.log(`📊 Total profiles: ${totalProfiles}`);
  console.log('\n🔐 You can login with:');
  console.log('   Email: test@example.com');
  console.log('   Password: password123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
