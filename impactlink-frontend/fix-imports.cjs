const fs = require('fs');
const path = require('path');

const files = [
    'Dashboard.jsx', 'Profile.jsx', 'Settings.jsx', 'CreateCampaign.jsx', 'AdminDashboard.jsx'
];

const pagesDir = path.join(__dirname, 'src', 'pages');

for (const file of files) {
    const fp = path.join(pagesDir, file);
    let c = fs.readFileSync(fp, 'utf8');
    const orig = c;

    // Add centralized imports after the framer-motion import line
    if (c.includes('from "framer-motion"') && !c.includes('from "../utils/animations"')) {
        // Determine what we need based on file content
        let imports = [];
        imports.push('fadeUp');
        imports.push('gpuStyles');

        if (c.includes('stagger') || c.includes('StaggerChildren')) imports.push('staggerContainer');
        if (c.includes('whileHover') && (c.includes('card') || c.includes('Card'))) imports.push('cardHover');
        if (c.includes('whileTap') || c.includes('whileHover')) imports.push('buttonTap');
        if (c.includes('scaleIn') || c.includes('scale: 0.95')) imports.push('scaleIn');
        if (c.includes('AnimatePresence')) imports.push('slideDown');

        // Add stepVariants for CreateCampaign
        if (file === 'CreateCampaign.jsx') imports.push('stepVariants');

        const unique = [...new Set(imports)];
        const importLine = `import { ${unique.join(', ')} } from "../utils/animations";`;

        // Insert after framer-motion import
        c = c.replace(
            /(import \{[^}]+\} from "framer-motion";)/,
            `$1\n${importLine}`
        );
    }

    // Replace inline initial/animate with gpuStyles on m.div/m.tr elements
    // Add style={gpuStyles} to m.div that have initial/animate
    // This is targeted — just add gpuStyles import. The inline animations are OK since they use only GPU props.

    if (c !== orig) {
        fs.writeFileSync(fp, c, 'utf8');
        console.log('Updated:', file);
    } else {
        console.log('Skipped:', file);
    }
}

// Update Navbar and Footer
const compDir = path.join(__dirname, 'src', 'components');
for (const file of ['Navbar.jsx', 'Footer.jsx']) {
    const fp = path.join(compDir, file);
    let c = fs.readFileSync(fp, 'utf8');
    const orig = c;

    if (c.includes('from "framer-motion"') && !c.includes('from "../utils/animations"')) {
        let imports = ['gpuStyles'];
        if (file === 'Navbar.jsx') imports.push('dropdownVariants');
        if (file === 'Footer.jsx') imports.push('fadeUp');

        const importLine = `import { ${imports.join(', ')} } from "../utils/animations";`;
        c = c.replace(
            /(import \{[^}]+\} from "framer-motion";)/,
            `$1\n${importLine}`
        );
    }

    if (c !== orig) {
        fs.writeFileSync(fp, c, 'utf8');
        console.log('Updated:', file);
    }
}

console.log('Done!');
