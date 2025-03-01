document.addEventListener('DOMContentLoaded', () => {
    const getContactButton = document.getElementById('getContactButton');
    const contactInfoDiv = document.getElementById('contactInfo');
    const senatorNamePara = document.getElementById('senatorName');
    const senatorPhonePara = document.getElementById('senatorPhone');
    const senatorBuildingPara = document.getElementById('senatorBuilding');
    const scriptContainerDiv = document.getElementById('scriptContainer');
    const lastNamePlaceholder = document.getElementById('lastNamePlaceholder'); // No longer needed to set textContent directly
    const lastNamePlaceholder2 = document.getElementById('lastNamePlaceholder2'); // No longer needed to set textContent directly
    const phoneScriptPara = document.getElementById('phoneScript');
    const callCompletedButton = document.getElementById('callCompletedButton');
    const alternateScriptButton = document.getElementById('alternateScriptButton');
    const fireworksContainer = document.getElementById('fireworksContainer');
    const callAgainModal = document.getElementById('callAgainModal');
    const callAgainButton = document.getElementById('callAgainButton');
    const callCountSpan = document.getElementById('callCount');
    const callHistoryList = document.getElementById('callHistoryList');


    let calledSenators = []; // Array to store senators who have been called
    let callCount = 0; // Counter for the number of calls made


    const senatorsData = `
ALSOBROOKS, Angela D. (D-MD) SD-B40E 4-4524
BALDWIN, Tammy (D-WI) SH-141 4-5653
BANKS, Jim (R-IN) SR-B85 4-4814
BARRASSO, John (R-WY) SD-307 4-6441
BENNET, Michael F. (D-CO) SR-261 4-5852
BLACKBURN, Marsha (R-TN) SD-357 4-3344
BLUMENTHAL, Richard (D-CT) SH-503 4-2823
BLUNT ROCHESTER, Lisa (D-DE) SH-513 4-2441
BOOKER, Cory A. (D-NJ) SH-306 4-3224
BOOZMAN, John (R-AR) SD-555 4-4843
BRITT, Katie (R-AL) SH-502 4-5744
BUDD, Ted (R-NC) SR-304 4-3154
CANTWELL, Maria (D-WA) SH-511 4-3441
CAPITO, Shelley Moore (R-WV) SR-170 4-6472
CASSIDY, Bill (R-LA) SD-455 4-5824
COLLINS, Susan M. (R-ME) SD-413 4-2523
COONS, Christopher A. (D-DE) SR-218 4-5042
CORNYN, John (R-TX) SH-517 4-2934
CORTEZ MASTO, Catherine (D-NV) SH-309 4-3542
COTTON, Tom (R-AR) SR-326 4-2353
CRAMER, Kevin (R-ND) SH-313 4-2043
CRAPO, Mike (R-ID) SD-239 4-6142
CRUZ, Ted (R-TX) SR-167 4-5922
CURTIS, John R. (R-UT) SR-B11 4-5251
DAINES, Steve (R-MT) SH-320 4-2651
DUCKWORTH, Tammy (D-IL) SH-524 4-2854
DURBIN, Richard J. (D-IL) SH-711 4-2152
ERNST, Joni (R-IA) SR-260 4-3254
FETTERMAN, John (D-PA) SR-142 4-4254
FISCHER, Deb (R-NE) SR-448 4-6551
GALLEGO, Ruben (D-AZ) SR-188 4-4521
GILLIBRAND, Kirsten E. (D-NY) SR-478 4-4451
GRAHAM, Lindsey (R-SC) SR-211 4-5972
GRASSLEY, Chuck (R-IA) SH-135 4-3744
HAGERTY, Bill (R-TN) SR-251 4-4944
HASSAN, Maggie (D-NH) SH-324 4-3324
HAWLEY, Josh (R-MO) SR-115 4-6154
HEINRICH, Martin (D-NM) SH-709 4-5521
HICKENLOOPER, John W. (D-CO) SH-316 4-5941
HIRONO, Mazie K. (D-HI) SH-109 4-6361
HOEVEN, John (R-ND) SR-338 4-2551
HUSTED, Jon A. (R-OH) SR-198 4-3353
HYDE-SMITH, Cindy (R-MS) SH-528 4-5054
JOHNSON, Ron (R-WI) SH-328 4-5323
JUSTICE, Jim (R-WV) SD-G12 4-3954
KAINE, Tim (D-VA) SR-231 4-4024
KELLY, Mark (D-AZ) SH-516 4-2235
KENNEDY, John (R-LA) SR-437 4-4623
KIM, Andy (D-NJ) SD-B40D 4-4744
KING, Angus S. (I-ME) SH-133 4-5344
KLOBUCHAR, Amy (D-MN) SD-425 4-3244
LANKFORD, James (R-OK) SH-731 4-5754
LEE, Mike (R-UT) SR-363 4-5444
LUJAN, Ben Ray (D-NM) SR-498 4-6621
LUMMIS, Cynthia M. (R-WY) SR-127A 4-3424
MARKEY, Edward J. (D-MA) SD-255 4-2742
MARSHALL, Roger (R-KS) SR-479A 4-4774
McCONNELL, Mitch (R-KY) SR-317 4-2541
McCORMICK, David (R-PA) SD-B40C 4-6324
MERKLEY, Jeff (D-OR) SH-531 4-3753
MOODY, Ashley B. (R-FL) SD-B40B 4-3041
MORAN, Jerry (R-KS) SD-521 4-6521
MORENO, Bernie (R-OH) SR-B33 4-2315
MULLIN, Markwayne (R-OK) SH-330 4-4721
MURKOWSKI, Lisa (R-AK) SH-522 4-6665
MURPHY, Christopher (D-CT) SH-136 4-4041
MURRAY, Patty (D-WA) SR-154 4-2621
OSSOFF, Jon (D-GA) SH-317 4-3521
PADILLA, Alex (D-CA) SH-331 4-3553
PAUL, Rand (R-KY) SR-295 4-4343
PETERS, Gary C. (D-MI) SH-724 4-6221
REED, Jack (D-RI) SH-728 4-4642
RICKETTS, Pete (R-NE) SR-139 4-4224
RISCH, James E. (R-ID) SR-483 4-2752
ROSEN, Jacky (D-NV) SH-713 4-6244
ROUNDS, Mike (R-SD) SH-716 4-5842
SANDERS, Bernard (I-VT) SD-332 4-5141
SCHATZ, Brian (D-HI) SH-722 4-3934
SCHIFF, Adam B. (D-CA) SH-112 4-3841
SCHMITT, Eric (R-MO) SR-387 4-5721
SCHUMER, Charles E. (D-NY) SH-322 4-6542
SCHUMER, Chuck (D-NY) SH-322 4-6542
SCOTT, Rick (R-FL) SH-110 4-5274
SCOTT, Tim (R-SC) SH-104 4-6121
SHAHEEN, Jeanne (D-NH) SH-506 4-2841
SHEEHY, Tim (R-MT) SD-G55 4-2644
SLOTKIN, Elissa (D-MI) SH-825B 4-4822
SMITH, Tina (D-MN) SH-720 4-5641
SULLIVAN, Dan (R-AK) SH-706 4-3004
THUNE, John (R-SD) SD-511 4-2321
TILLIS, Thom (R-NC) SD-113 4-6342
TUBERVILLE, Tommy (R-AL) SR-455 4-4124
VAN HOLLEN, Chris (D-MD) SH-730 4-4654
WARNER, Mark R. (D-VA) SH-703 4-2023
WARNOCK, Raphael G. (D-GA) SH-717 4-3643
WARREN, Elizabeth (D-MA) SH-311 4-4543
WELCH, Peter (D-VT) SR-124 4-4242
WHITEHOUSE, Sheldon (D-RI) SH-530 4-2921
WICKER, Roger F. (R-MS) SR-425 4-6253
WYDEN, Ron (D-OR) SD-221 4-5244
YOUNG, Todd (R-IN) SD-185 4-5623
`;

    // Function to parse senator data
    function parseSenators(data) {
        const senators = [];
        const lines = data.trim().split('\n');

        lines.forEach(line => {
            const parts = line.split(' ');
            if (parts.length < 3) return;  // Skip lines that don't match the expected format

            const lastName = parts[0].replace(',', ''); // Extract last name and remove comma
            let firstName = parts[1];
            let partyState;

            // Check if there's a middle initial
            if (parts[2].startsWith('(')) {
                // No middle initial
                partyState = parts[2];
            } else {
                // Middle initial exists, so partyState is at parts[3]
                firstName += ' ' + parts[2];  // Append middle initial to first name
                partyState = parts[3];
            }

            const fullName = `${firstName} ${lastName}`;

            partyState = partyState.substring(1, partyState.length - 1); //grabs (D-MD) and substrings to remove parenthese
            const party = partyState.substring(0, 1); //D or R
            const state = partyState.substring(2); //MD

            const phone = parts[parts.length - 1]; //phone number
            const building = parts[parts.length - 2]; //building name

            senators.push({
                fullName: fullName,
                lastName: lastName,
                party: party,
                state: state,
                phone: '202-22' + phone,
                building: building
            });
        });
        return senators;
    }

    const jsConfetti = new JSConfetti()

     const alternateScriptTemplate = `
              My name is [YOUR NAME]. I am a constituent residing at [YOUR ZIP CODE].<br><br>

              Everything Trump is doing is extremely worrying and f*cked. Senator <span id="lastNamePlaceholder">[Last Name]</span>, as a person who represents me, should do more to stop this madness.<br><br>

              I urge Senator <span id="lastNamePlaceholder">[Last Name]</span> to finally do something.<br><br>

              I would appreciate it if you could pass my message on to Senator <span id="lastNamePlaceholder2">[Last Name]</span>.
    `;

    const originalScriptTemplate = `
              My name is [YOUR NAME]. I am a constituent residing at [YOUR ZIP CODE].<br><br>

              I am calling to express my deep concern about potential shifts in U.S. foreign policy, specifically the proposed halt of military aid to Ukraine.<br><br>

              American aid is Ukraine's lifeline against Russia's brutal invasion.  To cut it is to cripple their defense. <br><br>

              Reduced aid guarantees a weaker Ukraine, unleashing humanitarian catastrophe and emboldening Russia's lawless aggression. The cost in lives and global order is unthinkable.<br><br>

              The U.S. must stand resolute against Russia's illegal war and for Ukraine's sovereign right to exist.  Consistent and robust support sends a powerful message to Ukraine, Russia, and to the world.<br><br>

              I urge Senator <span id="lastNamePlaceholder">[Last Name]</span> to strongly advocate for the continuation and strengthening of U.S. assistance to Ukraine.  It is an investment in peace, security, and the democratic values we share. <br><br>

              Thank you for your time and consideration of this urgent matter. I would greatly appreciate it if you would relay my message to Senator <span id="lastNamePlaceholder2">[Last Name]</span>.
        `;


    let senators = parseSenators(senatorsData);
    console.log(senators)
    function displaySenator() {
        if (senators.length === 0) {
            alert("You've contacted all the senators! Thank you!");
            return; // Or, optionally, reset the senators array to allow calling them again.
        }

        contactInfoDiv.classList.add('hidden'); //ensure hidden before displaying new senator
        scriptContainerDiv.classList.add('hidden'); //ensure hidden before displaying new senator


        const randomIndex = Math.floor(Math.random() * senators.length);
        const senator = senators[randomIndex];

        senatorNamePara.textContent = `Senator: ${senator.fullName} (${senator.party}-${senator.state})`;
        senatorPhonePara.textContent = `Phone: ${senator.phone}`;
        senatorBuildingPara.textContent = `Location: ${senator.building}`;


        // Set initial script and data-script-version
        phoneScriptPara.innerHTML = originalScriptTemplate.replace(/\[Last Name\]/g, senator.lastName); // Replace placeholders with last name
        scriptContainerDiv.dataset.scriptVersion = "1"; // Initialize to script version 1


        contactInfoDiv.classList.remove('hidden');
        scriptContainerDiv.classList.remove('hidden');

          // Remove called senator from the array
          senators.splice(randomIndex, 1);
          return senator;
    }


    callCompletedButton.addEventListener('click', () => {
        // Fireworks
        jsConfetti.addConfetti()

        // Update call count and history
        callCount++;
        callCountSpan.textContent = callCount;
        const senatorName = currentSenator.fullName
        const listItem = document.createElement('li');
        listItem.textContent = senatorName + ' (' + currentSenator.party + '-' + currentSenator.state + ')';
        callHistoryList.appendChild(listItem);


        // Show modal
        callAgainModal.style.display = "block";
    });

    alternateScriptButton.addEventListener('click', () => {
        if (scriptContainerDiv.dataset.scriptVersion === "1") {
            // Switch to alternate script
            phoneScriptPara.innerHTML = alternateScriptTemplate.replace(/\[Last Name\]/g, currentSenator.lastName); // Use currentSenator.lastName
            scriptContainerDiv.dataset.scriptVersion = "2";
        } else {
            // Switch back to original script, if needed
            phoneScriptPara.innerHTML = originalScriptTemplate.replace(/\[Last Name\]/g, currentSenator.lastName); // Use currentSenator.lastName
            scriptContainerDiv.dataset.scriptVersion = "1";
        }
    });

    // Call Again Button Logic
    callAgainButton.addEventListener('click', () => {
        callAgainModal.style.display = "none"; // Hide the modal
        contactInfoDiv.classList.add('hidden'); // Hide contact info before showing new one
        scriptContainerDiv.classList.add('hidden'); // Hide script container before showing new one
        const senator = displaySenator()
        currentSenator = senator; // Display the next senator
    });

    // Initial Senator Display
    let currentSenator;
    getContactButton.addEventListener('click', () => {
        const senator = displaySenator()
        currentSenator = senator
    });
});
