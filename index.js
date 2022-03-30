
// >>>>>>>> Begin const discord >>>>>>>>

const Discord = require('discord.js');

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_INTEGRATIONS] });

const { SlashCommandBuilder } = require('@discordjs/builders');


const { token } = require('../token.json');

const fs = require('fs');
const { fileURLToPath } = require('url');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
let test = false;

// <<<<<<<<< End const discord <<<<<<<<<

// >>>>>>>> Begin Discord Calls >>>>>>>>

client.once('ready', () => {
    console.log(`Bot ${client.user.tag} online !!\n\r`);


    const guildId = '691031398768705697';
    const guild = client.guilds.cache.get(guildId);
    let commands

    if (guild) {
        console.log("Guild found");
        commands = guild.commands;
        test = true
    } else {
        commands = client.application?.commands;
    }

    // commands?.create({ name: 'ping', description: 'Replies with pong' });
    commands?.create(new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong')
    );
    commands?.create(new SlashCommandBuilder()
        .setName('update')
        .setDescription('Updates the statuses')
    );
    commands?.create(new SlashCommandBuilder()
        .setName('help')
        .setDescription('Shows the help')
    );
    commands?.create(new SlashCommandBuilder()
        .setName('statuses')
        .setDescription('Gets the statuses of the services')
        .addStringOption(option => option
            .setName('assistants-services')
            .setDescription('Services from the Assistants Services group')
            .setRequired(false)
            .addChoice('All', 'all')
            .addChoice('Git-Assistants', 'git-assistants')
            .addChoice('Intranet-Assistants', 'intranet-assistants')
            .addChoice('k8s-Assistants-Prod-1-argoCD', 'k8s-assistants-prod-1-argocd')
            .addChoice('k8s-Assistants-Prod-1-Prometheus', 'k8s-assistants-prod-1-prometheus')
        ).addStringOption(option => option
            .setName('authentication')
            .setDescription('Services from the Authentication group')
            .setRequired(false)
            .addChoice('All', 'all')
            .addChoice('Kerberos-KDC-Ticket-Server', 'kerberos-kdc-ticket-server')
            .addChoice('LDAP', 'ldap')
            .addChoice('LDAPS', 'ldaps')
        ).addStringOption(option => option
            .setName('critical')
            .setDescription('Services from the Critical group')
            .setRequired(false)
            .addChoice('All', 'all')
            .addChoice('Console-Bocal', 'console-bocal')
            .addChoice('DNS', 'dns')
            .addChoice('Gitlab', 'gitlab')
            .addChoice('Gitlab-Registry', 'gitlab-registry')
            .addChoice('Intranet-Cri', 'intranet-cri')
            .addChoice('LDAP-Cri', 'ldap-cri')
            .addChoice('S3', 's3')
            .addChoice('Vault', 'vault')
        ).addStringOption(option => option
            .setName('internal-services')
            .setDescription('Services from the Internal Services group')
            .setRequired(false)
            .addChoice('All', 'all')
            .addChoice('Bookstack', 'bookstack')
            .addChoice('K8s-ArgoCD', 'k8s-argocd')
            .addChoice('K8s-ops-Grafana', 'k8s-ops-grafana')
            .addChoice('K8s-ops-Prometheus', 'k8s-ops-prometheus')
            .addChoice('K8s-Prod-1-Prometheus', 'k8s-prod-1-prometheus')
            .addChoice('Mail', 'mail')
        ).addStringOption(option => option
            .setName('others')
            .setDescription('Services from the Others group')
            .setRequired(false)
            .addChoice('All', 'all')
            .addChoice('Blog', 'blog')
            .addChoice('Documentation', 'documentation')
            .addChoice('HTTPS-Redirection', 'https-redirection')
            .addChoice('MaaS', 'maas')
            .addChoice('OIDC-Redirection', 'oidc-redirection')
        ).addStringOption(option => option
            .setName('pie-sm')
            .setDescription('Services from the PIE-SM group')
            .setRequired(false)
            .addChoice('All', 'all')
            .addChoice('Bttrack', 'bttrack')
            .addChoice('Django-PXE', 'django-pxe')
            .addChoice('Fleet-Manager', 'fleet-manager')
            .addChoice('iPXE', 'ipxe')
        ).addStringOption(option => option
            .setName('student-services')
            .setDescription('Services from the Student Services group')
            .setRequired(false)
            .addChoice('All', 'all')
            .addChoice('Git', 'git')
            .addChoice('Moodle-(cours)', 'moodle-(cours)')
            .addChoice('Moodle-(exams)', 'moodle-(exams)')
            .addChoice('Moodle-(Recrutement)', 'moodle-(recrutement)')
            .addChoice('News', 'news')
            .addChoice('Rocket.Chat', 'rocket-chat')
            .addChoice('Wiki-Prog', 'wiki-prog')
        )
    );
    commands?.create(new SlashCommandBuilder()
        .setName('add')
        .setDescription('Adds services')
        .addStringOption(option => option
            .setName('assistants-services')
            .setDescription('Services from the Assistants Services group')
            .setRequired(false)
            .addChoice('All', 'all')
            .addChoice('Git-Assistants', 'git-assistants')
            .addChoice('Intranet-Assistants', 'intranet-assistants')
            .addChoice('k8s-Assistants-Prod-1-argoCD', 'k8s-assistants-prod-1-argocd')
            .addChoice('k8s-Assistants-Prod-1-Prometheus', 'k8s-assistants-prod-1-prometheus')
        ).addStringOption(option => option
            .setName('authentication')
            .setDescription('Services from the Authentication group')
            .setRequired(false)
            .addChoice('All', 'all')
            .addChoice('Kerberos-KDC-Ticket-Server', 'kerberos-kdc-ticket-server')
            .addChoice('LDAP', 'ldap')
            .addChoice('LDAPS', 'ldaps')
        ).addStringOption(option => option
            .setName('critical')
            .setDescription('Services from the Critical group')
            .setRequired(false)
            .addChoice('All', 'all')
            .addChoice('Console-Bocal', 'console-bocal')
            .addChoice('DNS', 'dns')
            .addChoice('Gitlab', 'gitlab')
            .addChoice('Gitlab-Registry', 'gitlab-registry')
            .addChoice('Intranet-Cri', 'intranet-cri')
            .addChoice('LDAP-Cri', 'ldap-cri')
            .addChoice('S3', 's3')
            .addChoice('Vault', 'vault')
        ).addStringOption(option => option
            .setName('internal-services')
            .setDescription('Services from the Internal Services group')
            .setRequired(false)
            .addChoice('All', 'all')
            .addChoice('Bookstack', 'bookstack')
            .addChoice('K8s-ArgoCD', 'k8s-argocd')
            .addChoice('K8s-ops-Grafana', 'k8s-ops-grafana')
            .addChoice('K8s-ops-Prometheus', 'k8s-ops-prometheus')
            .addChoice('K8s-Prod-1-Prometheus', 'k8s-prod-1-prometheus')
            .addChoice('Mail', 'mail')
        ).addStringOption(option => option
            .setName('others')
            .setDescription('Services from the Others group')
            .setRequired(false)
            .addChoice('All', 'all')
            .addChoice('Blog', 'blog')
            .addChoice('Documentation', 'documentation')
            .addChoice('HTTPS-Redirection', 'https-redirection')
            .addChoice('MaaS', 'maas')
            .addChoice('OIDC-Redirection', 'oidc-redirection')
        ).addStringOption(option => option
            .setName('pie-sm')
            .setDescription('Services from the PIE-SM group')
            .setRequired(false)
            .addChoice('All', 'all')
            .addChoice('Bttrack', 'bttrack')
            .addChoice('Django-PXE', 'django-pxe')
            .addChoice('Fleet-Manager', 'fleet-manager')
            .addChoice('iPXE', 'ipxe')
        ).addStringOption(option => option
            .setName('student-services')
            .setDescription('Services from the Student Services group')
            .setRequired(false)
            .addChoice('All', 'all')
            .addChoice('Git', 'git')
            .addChoice('Moodle-(cours)', 'moodle-(cours)')
            .addChoice('Moodle-(exams)', 'moodle-(exams)')
            .addChoice('Moodle-(Recrutement)', 'moodle-(recrutement)')
            .addChoice('News', 'news')
            .addChoice('Rocket.Chat', 'rocket-chat')
            .addChoice('Wiki-Prog', 'wiki-prog')
        )
    );
    commands?.create(new SlashCommandBuilder()
        .setName('remove')
        .setDescription('removes services')
        .addStringOption(option => option
            .setName('assistants-services')
            .setDescription('Services from the Assistants Services group')
            .setRequired(false)
            .addChoice('All', 'all')
            .addChoice('Git-Assistants', 'git-assistants')
            .addChoice('Intranet-Assistants', 'intranet-assistants')
            .addChoice('k8s-Assistants-Prod-1-argoCD', 'k8s-assistants-prod-1-argocd')
            .addChoice('k8s-Assistants-Prod-1-Prometheus', 'k8s-assistants-prod-1-prometheus')
        ).addStringOption(option => option
            .setName('authentication')
            .setDescription('Services from the Authentication group')
            .setRequired(false)
            .addChoice('All', 'all')
            .addChoice('Kerberos-KDC-Ticket-Server', 'kerberos-kdc-ticket-server')
            .addChoice('LDAP', 'ldap')
            .addChoice('LDAPS', 'ldaps')
        ).addStringOption(option => option
            .setName('critical')
            .setDescription('Services from the Critical group')
            .setRequired(false)
            .addChoice('All', 'all')
            .addChoice('Console-Bocal', 'console-bocal')
            .addChoice('DNS', 'dns')
            .addChoice('Gitlab', 'gitlab')
            .addChoice('Gitlab-Registry', 'gitlab-registry')
            .addChoice('Intranet-Cri', 'intranet-cri')
            .addChoice('LDAP-Cri', 'ldap-cri')
            .addChoice('S3', 's3')
            .addChoice('Vault', 'vault')
        ).addStringOption(option => option
            .setName('internal-services')
            .setDescription('Services from the Internal Services group')
            .setRequired(false)
            .addChoice('All', 'all')
            .addChoice('Bookstack', 'bookstack')
            .addChoice('K8s-ArgoCD', 'k8s-argocd')
            .addChoice('K8s-ops-Grafana', 'k8s-ops-grafana')
            .addChoice('K8s-ops-Prometheus', 'k8s-ops-prometheus')
            .addChoice('K8s-Prod-1-Prometheus', 'k8s-prod-1-prometheus')
            .addChoice('Mail', 'mail')
        ).addStringOption(option => option
            .setName('others')
            .setDescription('Services from the Others group')
            .setRequired(false)
            .addChoice('All', 'all')
            .addChoice('Blog', 'blog')
            .addChoice('Documentation', 'documentation')
            .addChoice('HTTPS-Redirection', 'https-redirection')
            .addChoice('MaaS', 'maas')
            .addChoice('OIDC-Redirection', 'oidc-redirection')
        ).addStringOption(option => option
            .setName('pie-sm')
            .setDescription('Services from the PIE-SM group')
            .setRequired(false)
            .addChoice('All', 'all')
            .addChoice('Bttrack', 'bttrack')
            .addChoice('Django-PXE', 'django-pxe')
            .addChoice('Fleet-Manager', 'fleet-manager')
            .addChoice('iPXE', 'ipxe')
        ).addStringOption(option => option
            .setName('student-services')
            .setDescription('Services from the Student Services group')
            .setRequired(false)
            .addChoice('All', 'all')
            .addChoice('Git', 'git')
            .addChoice('Moodle-(cours)', 'moodle-(cours)')
            .addChoice('Moodle-(exams)', 'moodle-(exams)')
            .addChoice('Moodle-(Recrutement)', 'moodle-(recrutement)')
            .addChoice('News', 'news')
            .addChoice('Rocket.Chat', 'rocket-chat')
            .addChoice('Wiki-Prog', 'wiki-prog')
        )
    );

    commands?.create(new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clears the list of services in the CriStatus category')
    );

    console.log(`commands loaded`);

    client.guilds.cache.each(guild => {
        require('./update').execute(guild);
    });
});


client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand())
        return;
    const { commandName, options } = interaction;
    let server = interaction.guild.id
    console.log(`${server} : Command ${commandName}`);


    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);

        if (command.name === commandName) {
            try {
                await command.execute(interaction, options, test);
            } catch (error) {
                console.error(error);
            }
        }
    }
})

// <<<<<<<<< End Discord Calls <<<<<<<<<

client.login(token);



// all in : https://discord.com/api/oauth2/authorize?client_id=957708011164532766&permissions=1644971949559&scope=bot%20applications.commands

// https://discord.com/api/oauth2/authorize?client_id=957708011164532766&permissions=268437520&scope=bot%20applications.commands